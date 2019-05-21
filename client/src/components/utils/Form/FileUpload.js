import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import FontAwsomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

class FileUpload extends React.Component {

    state = {
        uploadedFiles: [],
        uploadling: false,

    };


    onDrop = (files) => {
        this.setState({uploading: true});
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        };
        formData.append("file", files[0]);
        axios.post('/api/users/upload_image', formData, config)
            .then(res => {
                this.setState({
                        uploading: false,
                        uploadedFiles: [
                            ...this.state.uploadedFiles,
                            res.data,
                        ],
                    }, () => {
                        this.props.imagesHandler(this.state.uploadedFiles)
                    }
                )
            })
    };

    onRemove=(id)=>{
        //removes the image in Cloudinary db
        //need to create a route to unset an image from Cloudinary
    };

    showUploadedImages = () => (
        this.state.uploadedFiles.map(item=>(
            <div className="dropzone_box"
                key={item.public_id}
                onClick={()=>this.onRemove(item.public_id)}
            >
                <div className="wrap"
                style={{background: `url(${item.url}) no-repeat`}}
                >


                </div>

            </div>
        ))
    );

    render() {
        return (
            <div>
                <section>
                    <div className="dropzone clear">
                        <Dropzone
                            onDrop={(e) => this.onDrop(e)}
                            multiple={false}
                            className="dropzone_box"
                        >
                            <div className="wrap">
                                <FontAwsomeIcon icon={faPlusCircle}/>
                            </div>

                        </Dropzone>
                        {this.showUploadedImages()}
                        {this.state.uploadling ?
                            <div className="dropzone_box" style={{textAlign: 'center', paddingTop: '60px'}}>
                                <CircularProgress
                                    style={{color: '#00bcd4'}}
                                    thickness={7}
                                />

                            </div>
                            : null}
                    </div>
                </section>

            </div>
        );
    }
}

export default FileUpload;