document.querySelector(".control-button span").onclick=function(){
 let yourname=prompt("what is youer name");
   
 if(yourname==null || yourname==""){
   document.querySelector(".name span").innerHTML="unknown"

 }else{
    document.querySelector(".name span").innerHTML=yourname;
 }
 
document.querySelector  (".control-button").remove();


}
 

let duration=1000;
let blocksContainer=document.querySelector(".memory-game-blocks");

let blocks=Array.from(blocksContainer.children);


// let orderRange=[...Array(blocks.length).keys()]

let orderRange=Array.from(Array(blocks.length).keys());
shuffle(orderRange);


blocks.forEach((block,index) => {

 function plays(){
  setTimeout(()=>{
    block.classList.add('is-flipped')
   },2000) ;
setTimeout(()=>{
 
   block.classList.remove('is-flipped')

},10000)
 }
 plays()
 
 
 
block.style.order=orderRange[index];

block.addEventListener("click",function (){
  flipBlock(block);
})

})

function flipBlock(selectblock){
  selectblock.classList.add('is-flipped');

  let allFlippedBlocks= blocks.filter(flippedBlock =>flippedBlock.classList.contains('is-flipped'));

  if(allFlippedBlocks.length===2){
    
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1])
  

  }

  
}
  
let triesElement=document.querySelector(".tries span");
function stopClicking(){
  blocksContainer.classList.add('no-clicking');
  
  setTimeout(() => {
    blocksContainer.classList.remove('no-clicking')

  },duration)
}
function checkMatchedBlocks(fristBlock,secondBlock){
 

  if(fristBlock.dataset.technology===secondBlock.dataset.technology){
     fristBlock.classList.remove('is-flipped');
     secondBlock.classList.remove('is-flipped');

     fristBlock.classList.add('has-match');
     secondBlock.classList.add('has-match');
     document.getElementById('success').play();

  } else {
    triesElement.innerHTML=parseInt(triesElement.innerHTML) + 1;
   
    setTimeout(() => {
      fristBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');
  
    },duration)
    document.getElementById('fail').play();
    
  }

}

function shuffle(array){
  let current=array.length,
  temp,
  random;

  while(current > 0 ){
     
    random=Math.floor(Math.random()*current);

    current--;

    temp=array[current];
    array[current]=array[random];
    array[random]=temp;
  }
  return array
}
