import { useContext, useEffect, useState } from "react"
import { ImageInfo, ImageProps } from "../../components/molecules/image"
import { FilePathListProps } from "../../components/molecules/filepath_list"
import SegmentationTemplate from "../../components/templates/segmentation"
import { eel } from "../../eel"
import FilePathWrapper from "../../domain/filepath_wrapper"
import { setSelectedFile, setSelectedLabel } from "../../store/actions"
import { AppContext, NO_INDEX } from "../../store/stores"
import Label from "../../domain/label"
import { LabelListProps } from "../../components/molecules/label_list"



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

    const onLabelClick = (label: Label) => {
        dispatch(setSelectedLabel(label.index))
    }
    const labelListProps: LabelListProps = {
        onClick: onLabelClick,
        labelList: state.labelList,
        selectedIndex: state.selectedLabelIndex
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

    const imageProps: ImageProps = {
        imageInfo: imageInfo,
        zoomRate: 100
    }

    return (
        <SegmentationTemplate
            filepathListProps={filepathListProps}
            labelListProps={labelListProps}
            imageProps={imageProps} />
    )
}