import React, {useState} from "react"
import {Modal, Upload} from 'antd'
import {PlusOutlined} from '@ant-design/icons'

import UploadApi from '../../api/upload'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const FileInput = ({data, request}) => {

    if (!data.image)
        data.image = '/images/alina.png'

    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState(data.image)

    const [previewTitle, setPreviewTitle] = useState(data.id)
    const [fileList, setFileList] = useState([
        {
            url: data.image
        },
    ])

    const handleCancel = () => setPreviewVisible(false)

    const handlePreview = async file => {

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }

        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))

    }

    const handleChange = (params) => {
        const {fileList} = params
        setFileList(fileList)
    }

    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Загрузить</div>
        </div>
    )

    return (
        <>
            <Upload
                listType="picture-card"
                customRequest={(params) => {
                    const formData = new FormData()
                    formData.append('file', params.file)

                    UploadApi.uploadUser(formData)
                        .then(response => {
                            params.file.url = `http://localhost/ntl/web${response.data}`
                            fileList.push(params.file)
                            setFileList(fileList)
                        })

                }}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                maxCount={1}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>

            <Modal
                visible={previewVisible}
                title={previewTitle}
                onCancel={handleCancel}
                footer={null}
            >
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>

        </>
    )

}

export default FileInput