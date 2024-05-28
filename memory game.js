document.querySelector(".control-buttons span").onclick = ()=>{
    let yourName = prompt("whats your name ?");

    if(yourName == ""|| yourName == null){

        document.querySelector(".name span").innerHTML='Unknown';

    }
    else{
        document.querySelector(".name span").innerHTML=yourName;

    }

    document.querySelector(".control-buttons").remove();
};

let duration =1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [... Array(blocks.length).keys()];
// or : Array.from(Array(blocks.length).keys());

shuffle(orderRange);

blocks.forEach((block, index) => {

    block.style.order =  orderRange[index];

    block.addEventListener('click',function (){

        flipBlock(block);
    });

});

function flipBlock(selectedBlock){

    selectedBlock.classList.add('is-flipped');

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if(allFlippedBlocks.length === 2){

        stopClicking();

        checkMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);

    }

}

function stopClicking(){
    blocksContainer.classList.add('no-clicking'); 
//      in css ==> .memory-game-blocks .no-clicking {
//     pointer-events: none;
// }
setTimeout(() => {

    // Remove Class No Clicking After The Duration 
    blocksContainer.classList.remove('no-clicking'); 

},duration);
}

// Check Matched Block 
function checkMatchedBlocks(firstBlock , secondBlock){

    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.technology === secondBlock.dataset.technology){

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
    
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
    
        // document.getElementById('success').play();
    
    }else{

    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {

        firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');

    },duration);

    
    
    }
}

// Shuffle Function 
function shuffle(array) {

    let current = array.length,
    temp,
    random;

    while(current > 0){

        random = Math.floor(Math.random() * current);

        current--;  

// swappppppppppppppppppppp

        // [1] Save Current Element in Stash
        temp = array[current] ;

        // [2] Current Element = Random Element 
        array[current] = array[random];

        // [3] Random Element = Get Element From Stash
        array[random] = temp ;

    }
    return array;

}

