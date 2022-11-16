




window.onload=function(){
    fetchEmployees()
    document.getElementById("refreshBtn").onclick=fetchEmployees;
   
}
   


    async function fetchEmployees(){
      
        let response=await fetch('https://randomuser.me/api/?results=5')
        
        let data=await response.json();
         console.log(data)
         displayEmployees(data.results)

        
    }
   
    function displayEmployees(data){
        let mainDiv=document.getElementById("empDiv")
        mainDiv.innerHTML=''
            
        for(let i=0;i< data.length;i++){
    
           let employee=data[i]
           let template=`
           <div class="img">
             <img src="${employee.picture.large}" alt="" />
           </div>
           <div class="details">
             <p class="names">Names:${employee.name.first} ${employee.name.last}</p>
             <p>Email:${employee.email}</p>
             <p>Gender:${employee.gender}
            
           </di>
           <hr>`

        let divEmp= document.createElement('div');
            divEmp.innerHTML=template 
            divEmp.classList='row'
            mainDiv.appendChild(divEmp)
        }
      
       
    }
   
    











