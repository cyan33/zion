## Network

Zion uses `Express.js` and `Socket.io` to host online multi-player games. This event-based communication between client and server makes it easy to figure out the data flow.

<!--- The APIs should be modified further --->

```js
// in server
const app = require('express')();
const http = require('http').Server(app);
const zion = require('zion');

const network = zion.createIO(http);

network.listen({
  'event-A': fnA.bind(fnA, params),
  'event-B': fnB.bind(fnB, params)
});
```
