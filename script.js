const currentsong= new Audio()
let currFolder


function secondsToMinutesSeconds(seconds){
    if(isNaN(seconds)||seconds<0){
        return ""
    }
    const minutes = Math.floor(seconds / 60);
    const remainingseconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2,'0');
    const formattedSeconds = String(remainingseconds).padStart(2,'0');
    return `${formattedMinutes}:${formattedSeconds}`
}




async function getSongs(folder){
  currFolder=folder;
  console.log(currFolder)
    let a = await fetch(`${currFolder}`)
    console.log(a)
    let response = await a.text();
    console.log(response)
    
    
    let div =document.createElement("div")
    div.innerHTML=response;
    let as = div.getElementsByTagName("a")

    songs =[]
    for (let index=0 ; index < as.length; index++){
    const element = as[index]
    if(element.href.endsWith(".mp3")){
        songs.push(element.href.split(`/${folder}`)[1])
    }
   
   }
    //show all the songs in the playlist
    const songUL= document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songUL.innerHTML=""
    for (const song of songs){
              
             
              songname=songUL.innerHTML+`<li>
              
              <div class="flex songlistdivs">
                  <img src="./assests/music.svg">
              <div class="songinfo" style="margin-left: 5px;">
                  <div class='songname'> ${song.replaceAll("%20"," ").replaceAll("%5B"," ").replaceAll('%5D'," ")}</div>
                  <div class="songurl" style="display:none" >
                  ${song}
                  </div>
                  
                  
              </div>
              <img src="./assests/play.svg" alt="playnow">
              </div>
          
              </li>`;
              songUL.innerHTML=songname
              
              
   }
    //Attach event listener to each  song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        
        e.addEventListener("click" , element=>{
             
             // console.log(e.querySelector(".songinfo").firstElementChild.innerHTML)
            playMusic(e.querySelector(".songurl").innerHTML.trim())
    })
   })

   //Attach event listener to each  song
   Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        
    e.addEventListener("click" , element=>{
         
         // console.log(e.querySelector(".songinfo").firstElementChild.innerHTML)
        // playMusicmobile(e.querySelector(".songurl").innerHTML.trim())
})
})



   return songs

}


const playMusic =(track , pause=false)=>{
    // const audio = new Audio("songs/"+track)
    currentsong.src=`${currFolder}`+track
    
   if(!pause){
    currentsong.play()
    play.src="pause.svg"
    mobileplay.src="pause.svg"
   } 
    document.querySelector(".mobilesongimage").innerHTML=`<img src ="/${currFolder}/cover.jpg" alt="surya" height="100%" width="100%"  style="border-radius: 10px;">`
    document.querySelector(".infoimage").innerHTML=`<img src ="/${currFolder}/cover.jpg" alt="surya" height="100%" width="100%"  style="border-radius: 10px;">`    
    document.querySelector(".information").innerHTML=decodeURI(track)
    console.log(track.replaceAll("%20"," ").replaceAll("%5B"," ").replaceAll('%5D'," "))
    document.querySelector(".mobileinformationofsong").innerHTML=track.replaceAll("%20"," ").replaceAll("%5B"," ").replaceAll('%5D'," ")
    
   

}
// //display all the albums on the page 
async function displayAlbums(){
  let a=await fetch(`songs/`)
  let response = await a.text();
  let div = document.createElement("div")
  div.innerHTML=response;
  let anchors = div.getElementsByTagName("a")
  let cardcontainer=document.querySelector(".cardcontainer")

  let array =Array.from(anchors)
  
  for (let index = 0; index < array.length; index++) {
      const e=array[index]
      let folder=e.href.split("/").slice(-2)[1]
      if(e.href.includes("/songs/")){
        
        console.log(folder)
        let a=await fetch(`songs/${folder}/info.json`)
        
        let response=await a.json();
        
        
        cardcontainer.innerHTML= cardcontainer.innerHTML+`<div data-folder="${folder}"  class="card  rounded">
                    
                    
        <div>
         <svg class="playbtn" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
             <circle cx="20" cy="20" r="18" fill="#1DB954"/>
             <path d="M28.8906 20.846C28.5371 22.189 26.8667 23.138 23.5257 25.0361C20.296 26.8709 18.6812 27.7884 17.37983 27.4196C16.8418 27.2671 16.35159 26.9776 15.95624 26.5787C15 25.6139 15 23.7426 15 20C15 16.2574 15 14.3861 15.95624 13.42132C16.35159 13.02245 16.8418 12.73288 17.37983 12.58042C18.6812 12.21165 20.296 13.12907 23.5257 14.96393C26.8667 16.86197 28.5371 17.811 28.8906 19.154C29.0365 19.7084 29.0365 20.2916 28.8906 20.846Z"  stroke-width="1.5" stroke-linejoin="round"/>
         </svg>
         </div>
     <img class="songimg" src="/songs/${folder}/cover.jpg" alt="" height="150px" width="150px"  style="border-radius: 10px;">
     <h4>${response.title} </h4>
     <p>${response.description}</p> 
        
    
       </div>`
      
    
        
      }
     }
  Array.from(document.getElementsByClassName("card")).forEach(e=>{
    console.log(e)
    e.addEventListener("click", async item=>{
               console.log("Fetching Songs")
               console.log(item.currentTarget.dataset)
               songs =  await getSongs(`songs/${item.currentTarget.dataset.folder}/`)
              //  songimggg=document.querySelector(".infoimage")
              //  songimggg.innerHTML=`<img src="songs/${item.currentTarget.dataset.folder}/cover.jpg" alt="surya" height="50px" width="50px">
               

    
     })
   })

  
  
  
}
  








async function main(){
    
   displayAlbums()

    //get the list of all songs
    songs=await getSongs(`songs/`)
    
      

    
    
    
    
    // //play rhe first song
    // const audio = new Audio(songs[0]);
    

   //Attach an event listener to play , next and previous
   play.addEventListener("click" , ()=>{
    if(currentsong.paused){
        currentsong.play()
        play.src="pause.svg"
       
    }else{
        currentsong.pause()
        play.src="play.svg"
    }
    
   })

   mobileplay.addEventListener("click" , ()=>{
    if(currentsong.paused){
        currentsong.play()
        mobileplay.src="pause.svg"
       
    }else{
        currentsong.pause()
        mobileplay.src="play.svg"
    }
   })
   //time update  for circle
   currentsong.addEventListener("timeupdate" , ()=>{
    
    document.querySelector(".songtime1").innerHTML=`${secondsToMinutesSeconds(currentsong.currentTime)}`
    document.querySelector(".songtime2").innerHTML=`${secondsToMinutesSeconds(currentsong.duration)}`
    document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100+"%"
    
   })
   currentsong.addEventListener("timeupdate" , ()=>{
    

    document.querySelector(".mobilecircle").style.left=(currentsong.currentTime/currentsong.duration)*100+"%"
    
   })
  //Add an event listener to seekbar
  document.querySelector(".seekbar").addEventListener("click",e=>{
    let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100
    document.querySelector(".circle").style.left=percent+"%";
    
    currentsong.currentTime=((currentsong.duration)*percent)/100
  })
  //add an event listen to mobile seekbar
  document.querySelector(".mobileseekbar").addEventListener("click",e=>{
    let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100
    document.querySelector(".mobilecircle").style.left=percent+"%";
    

    currentsong.currentTime=((currentsong.duration)*percent)/100
  })
  
  //Add an event listener for hamburger
  document.querySelector(".hamburger").addEventListener("click" ,()=>{
    document.querySelector(".left").style.left="0"
  })

  //Add an event listener for close
  document.getElementsByClassName("close")[0].addEventListener("click" ,()=>{
   
    document.querySelector(".left").style.left="-110%" 
    
    
   
  })
  //Add an event listener to previous
  previous.addEventListener("click" ,()=>{
    
    let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
    if((index-1)>=0){
        playMusic(songs[index-1])
    }
  })
  
  //Add an event listener to next
  next.addEventListener("click" ,()=>{
    
    let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
    if((index+1)>length){
        playMusic(songs[index+1])
    }
  })
  //Auto next play
  

   //Add an event listener to previous
   mobileprevious.addEventListener("click" ,()=>{
    console.log("Previous clicked")
    let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
    if((index-1)>=0){
        playMusic(songs[index-1])
    }
  })
  //Add an event listener to next
  mobilenext.addEventListener("click" ,()=>{
    
    let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
    if((index+1)>length){
        playMusic(songs[index+1])
    }
  })
//   Add an addEventListener to volume
  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change" , (e)=>{
    currentsong.volume=parseInt(e.target.value)/100
  })
  
//Add an addEventListener to mute the track
document.querySelector(".volumehigh").addEventListener("click",e=>{
  if(e.target.src.includes("volumehigh.svg")){
    e.target.src=e.target.src.replace("volumehigh.svg","mute.svg")
    currentsong.volume=0;
    document.querySelector(".range").getElementsByTagName("input")[0].value=0;
    
    document.getElementById('rangeValue').innerHTML=0
  }else{
    e.target.src=e.target.src.replace("mute.svg","volumehigh.svg")

    currentsong.volume=1;
    document.querySelector(".range").getElementsByTagName("input")[0].value=100
    document.getElementById('rangeValue').innerHTML=100
  }
 

})


  
}
main()
function updateRangeValue() {
    var rangeInput = document.getElementById('customRange');
    var rangeValueSpan = document.getElementById('rangeValue');

    rangeValueSpan.textContent = rangeInput.value;
}
updateRangeValue()

