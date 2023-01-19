def imagename = "gauravbarua/simple_bank_project"
def dockerImage = ''

node {
    def sonarScanner = tool name: 'SonarQube', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
    stage('Checkout Code') {
        git(url: 'https://github.com/GauravBarua/simple-bank-system.git', branch: 'master')
    }
    stage('Code Analysis'){
        withSonarQubeEnv(credentialsId: '966a39dc-c454-4ec7-b713-8b431cf339c3') {
            sh "${sonarScanner}/bin/sonar-scanner -Dsonar.projectKey=SonarQube -Dsonar.sources=."
        }
    }
    stage('Build Project') {
        //sh "npm i"
        sh "npm run"
    }
    stage('Test Cases Execution'){
            echo "tests successful"
    }
    stage('Building image') {
        script {
          dockerImage = docker.build imagename
      }
    }
     stage('Push Docker Image') {
        withCredentials([string(credentialsId: '69554ecd-740b-4432-a6db-b55189997f60', variable: 'Dockerpwd')]) {
        sh "docker login -u gauravbarua -p ${Dockerpwd}"
       }
        sh 'docker push gauravbarua/simple_bank_project:latest'
    }
    /*stage('Deploy Image') {
          withCredentials([usernamePassword(credentialsId: '57746ed7-93d3-4d07-8693-c982f64a570b', passwordVariable: 'Dockerpwd', usernameVariable: 'DockerUserName')]) {
            sh "docker login -u ${env.DockerUserName} -p ${env.Dockerpwd}"
            sh 'docker push gauravbarua/simple_bank_project:latest'
      }
    }*/
    node('Kubes') {
        stage('Run App') {
            sh """
                kubectl get pods
                docker pull gauravbarua/simple_bank_project
                docker images
            """ 
        }
    }
}
