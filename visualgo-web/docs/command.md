## 指令参数设置

- ```js
  newRectangleCmd = function newRectangleNode(id, value, x, y, width, height)
  ```

- ```js
  newCircleCmd = function newCircleNode(id, value, x, y, radius)
  ```

- ```javascript
  newLabelCmd = function newLabelNode(id, value, x, y)
  ```

- ```js
  newPointerCmd = function newPointerNode(id, text, x, y, length, direction)
  ```

- ```js
  newFillRectangleCmd = function newFillRectangleNode(id, value, x, y, width, height)
  ```

- ```js
  deleteCmd = function deleteNode(id)
  ```

- ```js
  moveCmd = function SingleAnimation(id, beginX, beginY, endX, endY)
  ```

- ```js
  connectCmd = function connectNode(startId, endId, curves, isDirection, weigth)
  ```

- ```js
  disconnectCmd = function disconnectNode(startId, endId)
  ```

- ```js
  commitCmds = function(){break}
  ```

- ```js
  setNodeColorsCmd = function setNodeColors(id, fgColor, bgColor)
  ```

- ```js
  setEdgeColorsCmd = function setEdgeColors(startId, endId, fgColor, bgColor)
  ```

- ```js
  setCoordinatesCmd = function setNodeCoordinates(id, x, y)
  ```

- ```js
  setInnerColorCmd = function setNodeInner(id, isInner, innerColor)
  ```

- ```js
  setNodeValueCmd = function setNodeValue(id, value)
  ```

- ```js
  deleteAllObjectCmd = function ()
  ```

- ```js
  setEdgeLineWidthCmd = function setEdgeLineWidth(startId, endId, lineWidth)
  ```

- ```js
  setNodeLineWidthCmd = function setNodeLineWidth(id, lineWidth)
  ```

- ```js
  newLineCmd = function newLineNode(id, startX, startY, enX, endY)
  ```