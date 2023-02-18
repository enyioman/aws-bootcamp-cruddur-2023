# Week 0 — Billing, Security, and Architecture

Welcome to my first journal for the AWS Cloud Project Free Bootcamp organized by Andrew Brown and his team. Thank you guys!

## App Architecture

Lucidchart was used to illutrate the app conceptual, logical and infrastructural architecture. This is the [link](https://lucid.app/lucidchart/b20676bd-89b1-4ffa-a341-c9c269aef784/edit?viewport_loc=144%2C139%2C1579%2C867%2CZ2-xDaLVWdz9&invitationId=inv_06ff5e3b-1720-45a5-9413-434b1c83bff2) to the architecture. The challenge I had here was having limited number of icons I could use due to my free-tier account. I was able to streamline the architecture to arrive at something meaningful but minimal at the same time.

![Conceptual Architecture](../_docs/assets/week0/concept.png)

![Logical Architecture](../_docs/assets/week0/logic.png)


## Setup

For the bootcamp, participants were meant to setup some environments being tools for the projects.

Some of them include: 

- Create GitHub Account
- Create Gitpod Account
- Create Github CodeSpace
- Create AWS Account
- Create Lucidchart Account
- Create Honeycomb.io Account
- Create Rollbar Account

In order to secure the Cloud Infrastructure, monitor cost and adhere to best practises, the following actions were taken.

1. Multi-Factor Authentication (MFA) was enabled on the root user. This is to increase the security of user accounts by adding an extra layer of protection against unauthorized access. 

![Root MFA](../_docs/assets/week0/root-mfa.png)

For the reason of security and best practices, the root user should not be used for daily activities. Therefore, I created an IAM user, created a group, `Admin`, with `AdministratorAccess` permissions and added the user to the group.

![Root MFA](../_docs/assets/week0/usergroup.png)

To secure this user, MFA was also enabled on it. I also created and downloaded the CSV file with the user's `Access Key` and `Secret Access Key`.

![User MFA](../_docs/assets/week0/user-mfa.png)

2. I installed AWS CLI manually on Gitpod. Then modified the `.gitpod.yml` file with the following code so that AWS CLI automatically installs whenever Gitpod workspace is launched.

```
tasks:
  - name: aws-cli
    env:
      AWS_CLI_AUTO_PROMPT: on-partial
    init: |
      cd /workspace
      curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
      unzip awscliv2.zip
      sudo ./aws/install
      cd $THEIA_WORKSPACE_ROOT
```

![AWS CLI](../_docs/assets/week0/cli-install.png)

3. The AWS User credentials were set as environmental variables on the Gitpod bash with the following commands:

```
export AWS_ACCESS_KEY_ID=""
export AWS_SECRET_ACCESS_KEY=""
export AWS_DEFAULT_REGION=us-east-1
```
The variables were then subsisted with the following commands so that Gitpod 'remembers' them at relaunch.

```
gp env AWS_ACCESS_KEY_ID=""
gp env AWS_SECRET_ACCESS_KEY=""
gp env AWS_DEFAULT_REGION=us-east-1
```

![env vars](../_docs/assets/week0/aws-keys.png)

4. Billing Alert was enabled through the root account. Also, the `IAM User and Role Access to Billing Information` was modified so that the user can have access to view costs and billing information.

Next, billing alarm was created by first creating an SNS topic using AWS CLI and then the alarm using Cloudwatch.

```
aws sns create-topic --name billing-alarm
```

```
aws sns subscribe \
    --topic-arn TopicARN \
    --protocol email \
    --notification-endpoint your@email.com
```

```
aws cloudwatch put-metric-alarm --cli-input-json file://aws/json/alarm_config.json
```

![SNS Topic](../_docs/assets/week0/sns-topic.png)

![Cloudwatch Alarm](../_docs/assets/week0/cw-alarm.png)


5. In order not to exceed the free-tier limit, two budgets were created through AWS CLI and Console. 

I exported my AWS Account ID and saved it as a variable with the following command: 

```
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
```

I updated the json files `budget.json` and `budget-notifications-with-subscribers.json` and then ran the below command:

```
aws budgets create-budget \
    --account-id $AWS_ACCOUNT_ID \
    --budget file://aws/json/budget.json \
    --notifications-with-subscribers file://aws/json/budget-notifications-with-subscribers.json
```

![Budget CLI](../_docs/assets/week0/budget-cli.png)

![AWS Budget](../_docs/assets/week0/budget.png)

6. I set up AWS Service Control Policy (SCP). With AWS SCP, administrators can create policies that can be applied to multiple AWS accounts within an organization, helping to enforce consistent security and compliance requirements. SCPs can be used to limit access to specific AWS services, regions, or actions, and can be used to enforce policies such as enforcing the use of encryption, restricting access to sensitive data, or blocking certain actions that could lead to security issues.

![SCP](../_docs/assets/week0/scp.png)

7. Lastly, I played around with AWS Cloudshell which is a fully-managed browser-based shell environment provided by AWS. It allows users to easily access a pre-configured Linux environment within the AWS Management Console, without requiring them to install or maintain any software.

![Cloudshell](../_docs/assets/week0/cloudshell.png)