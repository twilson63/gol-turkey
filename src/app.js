const React = require('react')
const gol = require('gol-functional')

const App = React.createClass({
  getInitialState() {
    return {
      board: [],
      sim: null,
      size: 20,
      speed: 1000,
      generate: true
    }
  },
  generateBoard(e) {
    e.preventDefault()
    const sim = gol({
      size: this.state.size,
      speed: this.state.speed,
      generate: this.state.generate
    }, board => this.setState({board}))
    this.setState({sim})
  },
  // componentDidMount() {
  //   const sim = gol({
  //     size: 20,
  //     speed: 1000,
  //     generate: true
  //   }, board => { this.setState({board})})
  //   this.setState({sim})
  // },
  start () {
    this.state.sim.start()
  },
  stop () {
    this.state.sim.stop()
  },
  toggle(row, col) {
    // this will run on every render
    return e => {
      this.state.sim.toggle(row, col)
      const board = this.state.board
      board[row][col] === 1 ? board[row][col] = 0 : board[row][col] = 1
      this.setState({board})
    }
  },
  render () {
    const td = rowIndex => (cell, colIndex) =>
      <td
        onClick={this.toggle(rowIndex, colIndex)}
        className={cell === 1 ? '' : ''}
        style={{
          height: '60px',
          minWidth: '60px'
        }}>
        { cell === 1 ? <img className="animated wobble" src="/turkey.png" /> : null }

      </td>

    const tr = (row, rowIndex) => <tr>{
      row.map(td(rowIndex))}</tr>


    return (
      <div className="pa4">

        <header>
          <h1>Gobble Gobble</h1>
          { this.state.sim ?
          <div>
            <button onClick={this.start}>Start</button>
            <button onClick={this.stop}>Stop</button>
          </div>
          : <div>
              <form onSubmit={this.generateBoard}>
                <span style={{marginRight: '5px'}}>Size</span>
                <input
                  value={this.state.size}
                  onChange={e => this.setState({size: e.target.value})}
                  style={{marginRight: '5px'}} type="text" placeholder="size" />
                <span style={{marginRight: '5px'}}>Speed</span>
                <input style={{marginRight: '5px'}}
                  value={this.state.speed}
                  onChange={e => this.setState({speed: e.target.value})}
                  type="text" placeholder="speed" />
                <input style={{marginRight: '5px'}}
                  checked={this.state.generate}
                  onChange={e => this.setState({generate: e.target.checked})}
                  type="checkbox" />
                <span style={{marginRight: '5px'}}>Generate</span>
                <button style={{marginRight: '5px'}}>Generate Board</button>
              </form>
            </div>
          }
        </header>
        <hr />
        <main>
          <table>
            {
              this.state.board.map(tr)
            }
          </table>
        </main>
      </div>
    )
  }
})

module.exports = App
