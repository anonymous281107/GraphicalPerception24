import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useDeleteSessionData, useSessions } from 'state'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadOffIcon from '@mui/icons-material/FileDownloadOff';
import { useNavigate } from 'react-router-dom';
import { downloadZip } from 'utils/files'

const iconStyle = { cursor: 'pointer', mx: 1 }
export default function SessionList() {
    const sessions = useSessions()
    const deleteSessionData = useDeleteSessionData()
    const navigate = useNavigate()
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 100,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'name',
            headerName: 'name',
            width: 200,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'assets',
            headerName: '# Assets',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.assets != null ? params.row.assets.length : 'N/A'
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                // console.log("The params are here", params)
                const handleStart = () => {
                    console.log("start clicked")
                    navigate(`/start/${params.id}`)
                }
                const handleDelete = () => {
                    deleteSessionData(params.id)
                }
                // const api = params.api
                return <>
                    <PlayCircleIcon color='primary' sx={iconStyle} onClick={handleStart} />
                    <DeleteIcon color='primary' sx={iconStyle} onClick={handleDelete} />
                </>
            }
        },
        {
            field: 'Clear Data',
            headerName: 'Clear Data',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                const row = params.row
                const { data } = row
                // console.log("The params are here", row)
                const handleDownload = async () => {
                    downloadZip(row)
                }
                if (Object.keys(data).length > 0) {
                    return <>
                        <DownloadIcon sx={iconStyle} onClick={handleDownload} />
                    </>
                }
                // const api = params.api
                return <>
                    <FileDownloadOffIcon />
                </>
            }
        },
    ];
    return (
        <div>
            <DataGrid sx={{ height: '80vh' }} rows={sessions && sessions.length && sessions || []} columns={columns} />
        </div>
    )
}
