let source;
let tiles =[]
let cols= 10
let rows = 10;
let w,h
let board =[];
let blankSpot =-1

function preload(){
  source = loadImage('hi.jpg')
 }

 function setup(){
     let canvas =createCanvas(600,600)
     console.log(window.innerHeight)
 
      canvas.position(window.innerWidth/2-300)
    w = width/cols;
    h = height/rows
 
    for(let i =0 ; i< cols;i++){
      for (let j = 0; j < rows; j++) {
        let x = i*w;
        let y =j*h
       let img =  createImage(w,h)
       img.copy(source,x,y,w,h,0,0,w,h);
        let index = i+j*cols
        board.push(index)

       let tile = new Tile(index,img)
       tiles.push(tile)
      } 
    }
    tiles.pop();
    board.pop()
    board.push(-1)
  simpleShuffle(board)
  
 }
   function swap(i,j,arr){
    let temp = arr[i]
    arr[i]=arr[j];
    arr[j]=temp;

   }
  function randomMove(arr){
    let r1 = floor(random(cols))
    let r2 = floor(random(rows) )
    move(r1,r2,arr)
  }
  function simpleShuffle(arr){
     for(let i=0;i<300000;i++){
      let r1 = floor(random(cols))
      let r2 = floor(random(rows) )
     randomMove(arr)
     }
  }
  function mousePressed(){
 let  i = floor(mouseX /h)
 let  j = floor(mouseY/w)
  move(i,j,board)
  }

  function draw(){
  //  image(source,0,0)
  background(0)
 //randomMove(board)
  for(let i =0 ; i< cols;i++){
  for (let j = 0; j < rows; j++) {
     let index = i+j*cols
     let x = i*w;
       let y =j*h
       let tileIndex  = board[index];
       if(tileIndex >-1){
       let img = tiles[tileIndex].img
       
       image(img,x,y,w,h)
       }
      } 
}
  for(let i =0 ; i< cols;i++){
  for (let j = 0; j < rows; j++) {
    let x = i*w;
    let y =j*h
        strokeWeight(2);
        noFill()
        rect(x,y,w,h)
      } 
}
  if(isSolved()){
 let body = document.querySelector('body')
     let div=  document.createElement('div')
     div.className='cont'
     let h1  = document.createElement('h1')
     h1.textContent= 'CONGRALUTION!'
     let h2  = document.createElement('h2')
     h2.textContent= ' U DID IT'
  div.append(h1)
  div.append(h2)
 body.appendChild(div)
     
   
  }
  }


     function isSolved(){
      for(let i = 0 ; i<board.length-1;i++){
        if(board[i] !== tiles[i].index){
          return false
        }
      }
      return true
     }  

   function move(i,j,arr){
 
    let blank  = findBlank()
    let blankCol = blank % cols;
    let blankRow = floor(blank/rows);
    if(isNeighbor(i,j,blankCol,blankRow)){
      swap(blank, i+j*cols,arr)
    }
  }

   function isNeighbor(i,j,x,y){
    if(i!== x&& j!==y){
      return false
    } 
    if(abs(i-x)== 1|| abs(j-y)) return true
    return false
   }

    function  findBlank(){
      for(let i =0; i<board.length;i++){
        if(board[i]== -1) return i;
      }
    }
   