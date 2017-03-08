import React, {Component} from 'react'
import XTerm from 'xterm'
import 'xterm/lib/addons/attach'
import 'xterm/lib/addons/fit'
import 'xterm/lib/xterm.css'

export default class Terminal extends Component {
	constructor(props) {
		super(props);
		this.pid = null,
		this.xterm = new XTerm()
		this.socket = null
	}
	componentDidMount() {
		const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://'
		let socketURL = `${protocol}${location.hostname}${location.port ? ':' + location.port : ''}/terminals/`

		this.xterm.open(this.refs.terminal)
		this.xterm.fit()

		fetch('/terminals', {
			method: 'POST'
		}).then(res => {
			res.text().then(pid => {
				this.pid = pid;
				socketURL += pid;
				this.socket = new WebSocket(socketURL)
				this.socket.onopen = () => {this.xterm.attach(this.socket)}
			});
		});
	}
	render() {
		return <div ref="terminal" className="terminal" style={{height: '300px'}}></div>
	}
}