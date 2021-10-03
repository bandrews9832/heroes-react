node {
    stage('Prepare') {
        dir('D:\\Documents\\Grad School\\Large Scale Application Deployment\\Jenkins Directory') {
            bat 'rmdir /S /Q heroes-react'
            bat 'git clone https://github.com/bandrews9832/heroes-react.git'
        }
               //git branch: 'Tech Task Wk3 Pipeline', url: 'https://github.com/bandrews9832/heroes-react.git'
    }
    stage('Build') {
        //update "heroes-react" to your project name
        dir('heroes-react') {
            bat 'npm install' //install dependencies
            bat 'npm audit fix' //correct any potential vulnerabilities 
            bat 'npm run build -- --prod' //run build
            archiveArtofacts 'build/**'
        }
    }
    stage('Deploy') {
        try {
            timeout(5) {
                //update "heroes-react" to your project name
                dir('heroes-react') {
                    bat 'npm run quick' //launch app
                }
            }
        } catch (err) {
            echo 'Been up 5 minutes...now exiting...'
        }
    }
    }