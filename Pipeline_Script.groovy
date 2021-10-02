node {
    stage('Prepare') {
        //cleanup workspace
        //clone git repo
    }
    stage('Build') {
        //update "heroes-react" to your project name
        dir('heroes-react') {
            //install dependencies
            //run build
        }
    }
    stage('Deploy') {
        try {
            timeout(5) {
                //update "heroes-react" to your project name
                dir('heroes-react') {
                    //launch app
                }
            }
        } catch (err) {
            echo 'Been up 5 minutes...now exiting...'
        }
    }
    }