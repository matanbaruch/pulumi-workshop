import * as pulumi from "@pulumi/pulumi"
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";

const name = 'workshop-cluster'

const vpc = new awsx.ec2.Vpc(`${name}-vpc`, {
    cidrBlock: "172.16.0.0/24",
    subnets: [
        {
            type: "private",
            tags: {
                "kubernetes.io/role/internal-elb": "1",
            }
        },
        {
            type: "public",
            tags: {
                "kubernetes.io/role/elb": "1",
            }
        }],
    tags: {
        Name: `${name}-vpc`,
        Owner: "matanbaruch",
        owner: "matanbarcuh",
    }
});

//const kubeconfigOpts: eks.KubeconfigOptions = {profileName: profile};

const cluster = new eks.Cluster(name, {
    //providerCredentialOpts: kubeconfigOpts,
    vpcId: vpc.id,
    privateSubnetIds: vpc.privateSubnetIds,
    publicSubnetIds: vpc.publicSubnetIds,
    instanceType: "t3.large",
    desiredCapacity: 2,
    minSize: 1,
    maxSize: 2,
    createOidcProvider: true,
    tags: {
        Owner: "matanbaruch",
        owner: "matanbaruch",
    },
    roleMappings: [
        {
            roleArn: "arn:aws:iam::805787217936:user/admin",
            groups: ["system:masters"],
            username: "chen:leibovich",
        },
        {
            roleArn: "arn:aws:iam::805787217936:role/fulladmin",
            groups: ["system:masters"],
            username: "full:admin",
        }
    ]
});

vpc.privateSubnetIds.then(id => id.forEach((id, index) => {
    new aws.ec2.Tag(`subnettag-${index}`, {
        key: cluster.eksCluster.name.apply(name => `kubernetes.io/cluster/${name}`),
        resourceId: id,
        value: "owned",
    }, { parent: cluster})
}))

export const clusterName = cluster.eksCluster.name
export const kubeconfig = cluster.kubeconfig
