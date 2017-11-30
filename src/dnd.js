const { getBoundaries } = require('./canvas')();

/**
 * drag and drop in canvas is much different than in DOM, because the canvas comes
 * as a whole, so these functions may seem to be hacky, or dirty.
 */
export default function createDnD() {
  const getDraggingItemIndex = (items, x, y) => {
    for (let i = 0; i < items.length; i++) {
      let currItem = items[i];
      let {
        top,
        left,
        right,
        bottom
      } = getBoundaries(currItem.position, currItem.size);

      if (x < right && x > left && y < bottom && y > top) {
        return i;
      }
    }
    return -1;
  };

  // todo: add further wrapped apis, like sprite.draggable()

  let isCollapsed = (items, draggingIndex) => {
    // check if the `draggingIndex`th of items overlaps any one of the rest elements
    if (draggingIndex < 0 || items.length === 0)  return;

    const dragging = items[draggingIndex];
        
    const { x, y } = dragging.position;
    const center = {
      x: x + dragging.size.width / 2,
      y: y + dragging.size.height / 2,
    };

    for (let i = 0; i < items.length; i++) {
      if (i === draggingIndex)    continue;
      const {
        top,
        right,
        left,
        bottom
      } = getBoundaries(items[i].position, items[i].size);
      if (center.x < right && center.x > left 
                && center.y < bottom && center.y > top) {
        return i;
      }
    }
    return -1;
  };
    
  return {
    isCollapsed,
    getDraggingItemIndex,
  };
}
