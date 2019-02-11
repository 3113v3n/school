 
//import { AsyncResource } from 'async_hooks';



const   apiDeleteTasks = 'https://gawatask-app.herokuapp.com/delete-post.php';//fetch from db
const apiAddTasks = 'https://gawatask-app.herokuapp.com/add-post.php';//insert to db
const   apiUpdateTasks= 'https://gawatask-app.herokuapp.com/';
const apiClaimTask='https://gawatask-app.herokuapp.com/allocate.php'
const apiTaskHistory='https://gawatask-app.herokuapp.com/get-user-posts.php'
const apiGet_All_Task='https://gawatask-app.herokuapp.com/all-posts.php';

 const  apiGetUsers='https://gawatask-app.herokuapp.com/Users.php';
 const apiRegisterUsers='https://gawatask-app.herokuapp.com/add-user.php';  
const apiRegisterGtasker='https://gawatask-app.herokuapp.com/add-gtasker.php';
const apiGetUsername='https://gawatask-app.herokuapp.com/get-user.php';
const apiGtaskerHistory='https://gawatask-app.herokuapp.com/gtasker-tasks.php';

const apiTaskClaimCount='https://gawatask-app.herokuapp.com/tasks-count.php'
const apiUserCount='https://gawatask-app.herokuapp.com/user-count-posts.php'

///-----------------------**********TASKS*************-------------------////
 //get Task List=>(joblist screen)


deleteTask = async()=>{
    try{
        let response = await fetch (apiDeleteTasks,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(param)//check u_id
        });
        let responseJson = await response.json();
        return responseJson
    }catch(error){
        console.log(error);
        console.error(error);
    }
}

  //Add new Task

  async function AddNewTask(param){
      try{
            let response = await fetch(apiAddTasks,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(
                   param
               )
                
            });
            let responseJson = await response.json();
            console.log(responseJson);
            return responseJson.status;
            
      }catch(error){
        console.error(`Error is : ${error}`);
        console.log('there is an error');
      }
  }


  //update Tasks

async function updateTasks(params){
    try{
        let response = await fetch(apiUpdateTasks,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(params)
        });
        let responseJson = await response.json();
        return responseJson;

    }catch(error){
        console.error(`Error is : ${error}`);
    }
}

           
getPostID=async()=> {

    try{
        let response = await fetch(apiGet_All_Task);
        let responseJson = await response.json();
        return responseJson.post_id;
    }catch(error){
        console.log(`the error encountere during postID retreval : ${error}`)
    }
    
    
}

///--------------------***********USERS*************************---------------/////
registerUsers=async(param)=>{
    try{
        let response = await fetch(apiRegisterUsers,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(param)
        });
        let responseJson = await response.json();
        console.log(responseJson.userId);
        return responseJson.userId;

    }catch(error){
        console.log('THERE IS AN ERROR WITH THE NETWORK');
        console.error(`Error is : ${error}`);
       
    }
}

///get User list
getAllUsers=async()=>{
    try{
        let response=await fetch(apiGetUsers);
        let responseJson = await response.json();
        return responseJson;
    }catch(error){
        console.error(error);
    }
}
/////-----------------*********GTASKERS**********---------------////////

registerGtasker=async(param)=>{
    try{
        let response = await fetch(apiRegisterGtasker,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(param)
        });
        let responseJson = await response.json();
        console.log(responseJson.nat_id);
        return responseJson.nat_id;

    }catch(error){
        console.log('THERE IS AN ERROR!!!!!');
        console.error(`Error is : ${error}`);
       
    }
}
getUsername=async(param)=>{
    try{
        let response = await fetch(apiGetUsername,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(param)
        });
        let responseJson = await response.json();
        console.log(responseJson)
        return responseJson.uname;
    }catch(error){
        console.log(error);
    }
}

_claimTask=async(param)=>{
    try{
        let response = await fetch(apiClaimTask,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(param)
        });
        let responseJson = await response.json();
        return responseJson.status;
    }catch(error){
        console.error(error);
    }
}

getTaskHistory=async(param)=>{
    try{
        let response = await fetch(apiTaskHistory,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(param)
        });
        let responseJson = await response.json();
        return responseJson;
    }catch(error){
        console.error(error);
    }
}

gtaskerHistory=async(param)=>{
    try{
        let response = await fetch(apiGtaskerHistory,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(param)
        });
        let responseJson = await response.json();
        return responseJson;
    }catch(error){
        console.error(error);
    }
}
 _storeData=async(param)=>{
     try{
        await AsyncStorage.setItem(param);
     }catch(error){
        console.log(error)
     }
 }

_retrieveData=async(param)=>{
    try{
        const value = await AsyncStorage.getItem(param);
        if (!value==null){
            //data present
            console.log(param)
        }
    }catch(error){
        console.log(error);
    }
}
userPostCount = async(param)=>{
    try{
        let response = await fetch(apiUserCount,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(param)
        });
        let responseJson = await response.json();
        return responseJson.result;
    }catch(error){
        console.error(error);
    }
}

taskerClaimCount = async(param)=>{
    try{
        let response = await fetch(apiTaskClaimCount,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(param)
        });
        let responseJson = await response.json();
        return responseJson.result;
    }catch(error){
        console.error(error);
    }
}

export {taskerClaimCount};
export {userPostCount};
export {_claimTask};
export {_retrieveData};
export {getTaskHistory};
export {getUsername};
export {updateTasks};
export {registerGtasker}
export {AddNewTask};
export {getAllUsers};
export {registerUsers};
export {_storeData};
export {getPostID};
export {deleteTask};
export {gtaskerHistory};