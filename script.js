document.querySelector('.control-buttons span').onclick = () => {
    let playerName = prompt('Enter your name');
    if (playerName == null || playerName == '') {
        document.querySelector('.name span').innerHTML = 'Unknown';
    } else {
        document.querySelector('.name span').innerHTML = playerName;
    }
    document.querySelector('.control-buttons').remove();  
    
    // Shuffle the blocks
    shuffleBlocks(orderRange);
    blocks.forEach((block, index) => {
        block.style.order = orderRange[index];
    });
}

let duration = 1000; // 1 second

let blocksContainer = document.querySelector('.game-blocks');
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];


blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener('click', function() {
        // Prevent clicking on already flipped or matched blocks
        if (block.classList.contains('is-flipped') || block.classList.contains('matched') || blocksContainer.classList.contains('no-clicking')) {
            return;
        }
        
        // Add flipped class to the clicked block
        flipBlock(block);
    });
});

// flip block function
function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    
    if (allFlippedBlocks.length === 2) {
        // Stop clicking
        stopClicking();
        // Check matched blocks
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

// Stop clicking function
function stopClicking() {
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}

// Check matched blocks function
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');
    
    if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
        // Match found
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        
        firstBlock.classList.add('matched');
        secondBlock.classList.add('matched');
        
        // Check if all blocks are matched
        if (blocks.every(block => block.classList.contains('matched'))) {
            setTimeout(() => {
                alert('Congratulations! You won!');
            }, 500);
        }
    } else {
        // No match
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
    }
}

// Shuffle blocks
function shuffleBlocks(array) {
    let current = array.length, temp, random;
    while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
    }
    return array;
}