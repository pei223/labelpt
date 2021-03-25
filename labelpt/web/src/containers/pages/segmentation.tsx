import { useContext, useEffect, useState } from "react"
import { ImageInfo } from "../../components/molecules/layer_image"
import { FilePathListProps } from "../../components/molecules/filepath_list"
import SegmentationTemplate from "../../components/templates/segmentation"
import { eel } from "../../eel"
import FilePathWrapper from "../../domain/filepath_wrapper"
import { setSelectedFile, setSelectedLabel } from "../../store/actions"
import { AppContext, NO_INDEX } from "../../store/stores"
import { CanvasAreaProps, InnerCanvasAreaProps } from "../../components/organisms/canvas_area"



export const SegmentationPage = () => {
    const { state, dispatch } = useContext(AppContext)
    const [imageInfo, setImageInfo] = useState<ImageInfo>({
        fileName: "No image",
        imageSrc: null,
        width: 400,
        height: 400
    })

    const onFileRowClick = (filePath: FilePathWrapper, index: number) => {
        dispatch(setSelectedFile(index))
    }
    const filepathListProps: FilePathListProps = {
        onClick: onFileRowClick,
        filePathList: state.filePathList,
        selectedIndex: state.selectedFilePathIndex
    }

    // 選択されたファイルインデックスにフック
    useEffect(() => {
        if (state.selectedFilePathIndex === NO_INDEX) {
            return
        }
        const filePath = state.filePathList[state.selectedFilePathIndex]
        eel.load_jpeg_image_and_width_height(filePath.filePath)()
            .then((imageInfo: [any, number, number]) => setImageInfo({
                fileName: filePath.getFileName(),
                imageSrc: imageInfo[0],
                width: imageInfo[1],
                height: imageInfo[2]
            }))
    }, [state.selectedFilePathIndex])

    const canvasAreaProps: CanvasAreaProps = {
        imageInfo: imageInfo,
        labelList: state.labelList
    }

    return (
        <SegmentationTemplate
            filepathListProps={filepathListProps}
            canvasAreaProps={canvasAreaProps} />
    )
}