import React from 'react';
var Nav = require('Nav');


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imageToDownload: '',
            width:633,
            height:633,
            studentId: ''
        }
    }

    generateCanvas() {
        let that = this;

        html2canvas($('#preCanvas'), {
            onrendered: function(canvas) {
                that.setState({
                    ...that.state,
                    imageToDownload: canvas.toDataURL('image/png')
                });
            },
        });
    }

    onTextChange(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            studentId: e.target.value
        });

        this.generateCanvas();

    }

    componentDidMount() {
        console.log("Update");
        this.setState({
            ...this.state,
            imageToShow: '/img/default.png'
        });
    }

    onImageUpload(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {

            let img = $('#baseImage');
            let preCanvas = $('#preCanvas');
            let ratio = 1;

            this.setState({
                file: file,
                imageToShow: reader.result,
                width: img.width() * ratio,
                height: img.height() * ratio,
            });

            ratio = preCanvas.width() / img.width();

            this.setState({
                ...this.state,
                width: img.width() * ratio,
                height: img.height() * ratio,
            });

            this.generateCanvas();

        };

        reader.readAsDataURL(file);
    }

    render() {

        let {imageToShow, width, height, imageToDownload, studentId} = this.state;

        let canvasHeight = $('#preCanvas').height();

        let top = (canvasHeight - height)/2;
        if (top < 0) {
            top = 0;
        }
        console.log(canvasHeight, top);

        let style = {
            top: top
        };

        let renderDownloadButton = () => {
            if (imageToDownload !== '') {
                return <a href={imageToDownload} download={"image_" + studentId} className="button expanded large">บันทึกรูป</a>
            }
        };

        return (
            <div>
                <Nav/>
                <div className="row">
                    <div className="columns  small-12 medium-6 medium-push-6">
                        <br/>
                        <br/>
                        <br/>
                        <div className="input-group">
                            <div className="input-group-button">
                                <label htmlFor="fileUpload" className="button">
                                    เลือกรูป
                                </label>
                                <input onChange={this.onImageUpload.bind(this)} type="file" id="fileUpload" className="show-for-sr"/>
                            </div>
                            <input className="input-group-field"
                                   onChange={this.onTextChange.bind(this)}
                                   type="text"
                                   ref="studentId"
                                   placeholder="ใส่รหัสนักศึกษา"/>
                        </div>
                        {renderDownloadButton()}
                    </div>

                    <div className="columns small-12 medium-6 medium-pull-6">
                        <br/>
                        <span id="preCanvas" className="canvas">
                            <img width={width} height={height}
                                 id="baseImage"
                                 src={imageToShow}
                                 style={style}/>
                            <img className="frame" src="/img/frame.png"/>
                            <span id="student-id">{studentId}</span>
                        </span>
                    </div>
                </div>

                <div className="row">


                </div>

                <div className="row">
                    <div className="columns small-centered small-12 medium-6">

                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
