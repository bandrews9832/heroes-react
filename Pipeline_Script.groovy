node {
    stage('Prepare') {
        deleteDir(env.Tech_Task_Wk3_Loc)
        //bat 'rmdir -Path env.Tech_Task_Wk3_Loc'     // Old Path"D:\Documents\Grad School\Large Scale Application Deployment\Week 3\Tech Task\GitHub\heroes-react"' //cleanup workspace
        git branch: 'Tech Task Wk3 Pipeline', url: 'https://github.com/bandrews9832/heroes-react.git'
        //bat 'git clone https://github.com/bandrews9832/heroes-react.git -p env.Tech_Task_Wk3_Loc' //clone git repo
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