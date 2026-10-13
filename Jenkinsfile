pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        IMAGE_NAME = 'cepiseptiyana/coffee-api'
        IMAGE_TAG  = "${env.BUILD_NUMBER}"
    }

    stages {
        // Build gagal jika lint, format, atau test gagal (lihat stage "test" di Dockerfile)
        stage('Lint & Test') {
            steps {
                sh 'docker build --target test -t coffee-api-test:${IMAGE_TAG} .'
            }
        }

        stage('Build Image') {
            when { branch 'main' }
            steps {
                sh 'docker build --target production -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Push Image') {
            when { branch 'main' }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DH_USER',
                    passwordVariable: 'DH_PASS')]) {
                    sh '''
                        echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
                        docker push ${IMAGE_NAME}:${IMAGE_TAG}
                        docker push ${IMAGE_NAME}:latest
                    '''
                }
            }
        }

        // Stage Deploy: tambahkan sesuai server tujuan (ssh + docker compose pull/up -d)
    }

    post {
        always {
            sh 'docker rmi coffee-api-test:${IMAGE_TAG} || true'
            sh 'docker image prune -f'
        }
    }
}
