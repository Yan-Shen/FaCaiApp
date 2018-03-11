// Socket.IO allows you to emit and receive custom events. Besides connect, message and disconnect, you can emit custom events:
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
