## I/O

### Keyboard Handler

Zion uses [`KeyBus`](https://github.com/thomasyimgit/keybus) as its keyboard handling component. It supports basic keyboard event, and wraps up a hash-based simultaneous multikey handler functionality([Why?](https://stackoverflow.com/questions/15661796/how-to-handle-multiple-keypresses-with-canvas)).

Basic Usage:

```js
import KeyBus from 'keybus'

const kb = new KeyBus(document)

let enterKeydownHandler = kb.down(13, () => console.log('Enter keydown!'))

// to remove the keydown event handler for a specific key and event
enterKeydownHandler.remove()
```

Multikey handler:

```js
const canvas = document.getElementById('my-canvas')
const kb = new KeyBus(canvas)

kb.simulDown(38, () => console.log('up'))
kb.simulDown(39, () => console.log('right'))

function game_loop() {
  // the only thing you need to do is to call this method in every game loop,
  // the keybus will automatically check if anykey is pressed and run the according handlers (could be more than one)
  kb.executeMultiKeyHandlers();
}
```

### Audio Manager
Zion provides a wrapper for managing audio assets. The `AudioManager` class allows you to create, load, and play game audio. This class can be easily extended to support more advanced game features:
<!--- The APIs of audio manager should be modified further --->

```js
const audioMgr = zion.createAudioManager('/src/');  // absolute path from root folder

audioMgr.loadAudio({
  collision: 'collision.mp3'  // file name under the folder
});
audioMgr.findByName('collision').play();
```

### Drag and Drop

Supports basic drag and drop utilities:

- `getDraggingItemIndex()`
- `isCollapsed()`: dragging collision detection
