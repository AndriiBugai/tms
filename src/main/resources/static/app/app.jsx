import React, {Component} from "react";
import ReactDom from "react-dom";
import $ from 'jquery';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: []
        };
    }

    loadCommentsFromServer() {
        $.ajax({
            url: "https://codepen.io/jobs.json",
            dataType: 'json',
            success: (data) => {
                this.setState({jobs: data.jobs});
            },
            error: (xhr, status, err) => {
                console.error("url", status, err.toString());
            }
        });
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer.bind(this), 2000);
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render() {
        return (
            <div>
                <h1>Jobs!</h1>
                {this.state.jobs.map(function (job) {
                    return (
                        <div key={job.id} className="task">
                            <a href={job.url}>
                                {job.company_name}
                                is looking for a
                                {job.term}
                                {job.title}
                            </a>
                        </div>
                    );
                })}
            </div>
        )
    }
}
ReactDom.render(<App />, document.getElementById('react'));