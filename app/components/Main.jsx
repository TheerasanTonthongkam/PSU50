import React from 'react';
var Nav = require('Nav');


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageToShow: '',
            file: '',
            imageToDownload: '',
            width:1000,
            height:1000,
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

        let marginTop = -1 * (height/2);
        let marginLeft = -1 * (width/2);

        let style = {
          marginTop: marginTop,
            marginLeft: marginLeft,
            top: '50%',
            left: '50%'
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
                    <div className="columns small-12 medium-6">
                        <span id="preCanvas" className="canvas">
                            <img width={width} height={height}
                                 id="baseImage"
                                 src={imageToShow}
                                 style={style}/>
                            <img className="frame" src="/img/frame.png"/>
                            <span id="student-id">{studentId}</span>
                        </span>
                        <span id="canvas"></span>
                    </div>

                    <div className="columns  small-12 medium-6">
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
