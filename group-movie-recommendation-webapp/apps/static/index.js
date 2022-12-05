function user_data_fill(){
    users_num = document.getElementById("group_num").value;
    if(users_num >=2 & users_num<=15){
    const div = document.getElementById('user_data_container');
    const br = document.createElement("p");
    const mouse = document.getElementById('mouse');

    mouse.style.display = 'flex';    
   
    div.textContent="";
    
    // console.log(users_num);
   
    div.innerHTML += '<span class="demo_text">Please enter the following details for each user: </span>';

    //form creation begins
    content='<form name="demo" method="POST" action="/rate_movies">'; //<-- Change the form action here, need an action which can handle POST request
    for(let i=0;i<users_num;i++){
       content +=`<p></p>`
       content +=`<strong><span class="user_label">Name:</span></strong> <input type="text" placeholder="Enter name" id="user_name_${i}" name="user_name_${i}" class="user_text" required>&emsp;
       <strong><span class="user_label">Age:</span></strong> <input type="number" name="user_age_${i}" placeholder="Age" id="user_age_${i}" class="user_text age_text" required>&emsp;
       <strong><span class="user_label">Gender: </span></strong> 
       <input type=radio name="user_gender_${i}" value="Male" class= "gender_selector" id="user_male_${i}" /><label for="user_male_${i}" class="gender_selector">Male</label>&emsp;
       <input type=radio name="user_gender_${i}" value="Female" class= "gender_selector" id="user_female_${i}" /><label for="user_female_${i}" class="gender_selector">Female</label>&emsp;
       <input type=radio name="user_gender_${i}" value="Other" class= "gender_selector" id = "user_other_${i}"/><label for="user_other_${i}" class="gender_selector">Other</label>
       <br/>`;
       
       
    //    div.innerHTML += "<p>"
    //     div.innerHTML += `<strong><span class="user_label">Name:</span></strong> <input type="text" placeholder="Enter name" id="user_name_${i}" class="user_text" required>&emsp;
    //                       <strong><span class="user_label">Age:</span></strong> <input type="number" placeholder="Age" id="user_age_${i}" class="user_text age_text" required>&emsp;
    //                       <strong><span class="user_label">Gender: </span></strong> 
    //                       <input type=radio name="user_gender_${i}" value="Male" class= "gender_selector" id="user_male_${i}" /><label for="user_male_${i}" class="gender_selector">Male</label>&emsp;
    //                       <input type=radio name="user_gender_${i}" value="Female" class= "gender_selector" id="user_female_${i}" /><label for="user_female_${i}" class="gender_selector">Female</label>&emsp;
    //                       <input type=radio name="user_gender_${i}" value="Other" class= "gender_selector" id = "user_other_${i}"/><label for="user_other_${i}" class="gender_selector">Other</label><br/></form>`;
        // let p = document.createElement("input");

        // const br = document.createElement("p");
        // div.append(br);
        // div.append("Name: ",p,br);
    }
    content += `<button type="submit" class="demographic_btn" id="submit_demographics" onClick="submit_demographic_data()">Submit Demographic Data</button>
                </form>`
    // div.innerHTML += `<button type="submit" class="demographic_btn" id="submit_demographics" onClick="submit_demographic_data()">Submit Demographic Data</button>`
    // console.log(content);
    //dump created form to html
    div.innerHTML+=content;
}

 else {
    alert("Please enter a group size between 2 and 15");
}
}

function submit_demographic_data(){
    users_num = document.getElementById("group_num").value;
    let user_data={}
    for (i=0;i<users_num;i++){
        user_name = document.getElementById(`user_name_${i}`).value;
        user_age = parseInt(document.getElementById(`user_age_${i}`).value);
        ele = document.getElementsByName(`user_gender_${i}`);
        for(j=0;j<ele.length;j++){
            if(ele[j].checked){
                user_gender = ele[i].value;
            }
        }
        user_data[i] = {"name": user_name,
                        "age": user_age,
                        "gender":user_gender
                        }

    }

    console.log(user_data);
}