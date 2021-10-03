node {
    stage('Prepare') {
        dir('D:\\Documents\\Grad School\\Large Scale Application Deployment\\Jenkins Directory') {
            bat 'rmdir /S /Q heroes-react'
            bat 'git clone https://github.com/bandrews9832/heroes-react.git'
        }
    }
    stage('Build') {
        //update "heroes-react" to your project name
        dir('D:\\Documents\\Grad School\\Large Scale Application Deployment\\Jenkins Directory\\heroes-react') {
            bat 'npm install' //install dependencies
            bat 'npm run build -- --prod' //run build
            //archiveArtofacts 'build/**'
        }
    }
    stage('Deploy') {
        try {
            timeout(5) {
                //update "heroes-react" to your project name
                dir('D:\\Documents\\Grad School\\Large Scale Application Deployment\\Jenkins Directory\\heroes-react') {
                    bat 'npm run quick' //launch app
                }
            }
        } catch (err) {
            echo 'Been up 5 minutes...now exiting...'
        }
    }
    }