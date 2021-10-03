node {
    stage('Prepare') {
        bat "cd 'D:\Documents\Grad School\Large Scale Application Deployment\Week 3\Tech Task\GitHub'"
        bat "rmdir -Path 'D:\Documents\Grad School\Large Scale Application Deployment\Week 3\Tech Task\GitHub\heroes-react'" //cleanup workspace
        bat 'git clone https://github.com/bandrews9832/heroes-react.git' //clone git repo
    }
    stage('Build') {
        //update "heroes-react" to your project name
        dir('heroes-react') {
            bat 'npm install' //install dependencies
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