import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Grid } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ButtonComponent from '../../components/Buttons/Buttons'
import { useNavigate } from 'react-router'
import Loader from '../../components/Loaders/Loaders'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import Alerts from '../../components/Alerts/Alert'
import AlertDialogBox from '../../components/AleartDialogBox/AleartDialogBox'
import Badge from '@mui/material/Badge'
import SpanningTable from '../../components/table/Table'
const columns = [
  { id: 'id', label: 'Order ID', minWidth: 70 },
  { id: 'date', label: 'Date', minWidth: 70 },
  { id: 'status', label: 'Status', minWidth: 70 },
]
let viewButton = {
  size: 'small',
  color: 'info',
  label: 'View',
  startIcon: <VisibilityIcon />,
  type: 'submit',
}
let cancelButton = {
  size: 'small',
  color: 'error',
  label: 'Cancel',
  startIcon: <CancelPresentationIcon />,
  type: 'reset',
}
export default function MyOrders() {
  const [open, setOpen] = useState(false)
  const [cancelOrder, setCancelOrder] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [response, setResponse] = useState()
  const [rows, setRows] = useState(['loading'])
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const [loader, setLoader] = useState(true)
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const navigate = useNavigate()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const loadOrders = async () => {
    const token = localStorage.getItem('authToken')
    try {
      const _loadOrders = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/order/myorders`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      )

      if (_loadOrders.status !== 200) {
        setResponse(_loadOrders.status)
        throw new Error()
      }

      const allOrders = await _loadOrders.json()
      setRows(allOrders.userOrder)
      setLoader(false)
    } catch (err) {
      console.error('Error:', err)
    }
  }
  const cancelOrders = async (id) => {
    const token = localStorage.getItem('authToken')
    const status = 'cancelled'
    try {
      setIsLoading(true)
      const _cancelOrders = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/order/` + id,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({ status }),
        },
      )

      if (_cancelOrders.status !== 200) {
        setResponse(_cancelOrders.status)

        // throw new Error()
      }
      if (_cancelOrders.status === 200) {
        setIsLoading(false)
        setResponse(_cancelOrders.status)
      }
    } catch (err) {
      console.error('Error:', err)
    }
  }
  const TokenCheck = async () => {
    const token = localStorage.getItem('authToken')
    if (token !== 'null') {
      try {
        const _data = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/authtoken`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          },
        )
        if (_data.status !== 200) {
          navigate('/')
        }
      } catch (err) {
        console.log('Unauthorized access denied')
      }
    } else {
      navigate('/')
    }
  }
  useEffect(() => {
    TokenCheck()
    loadOrders()
  }, [isLoading])
  if (loader) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '50vh' }}
      >
        <Loader />
      </Grid>
    )
  }
  if (!rows) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        style={{ minHeight: '60vh', marginTop: '3rem' }}
      >
        Nothing to show. Make your order today ;-)
      </Grid>
    )
  }
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      style={{ minHeight: '60vh', marginTop: '3rem' }}
    >
      <AlertDialogBox
        open={open}
        close={setOpen}
        onClick={() => {
          handleClose()
        }}
        click={() => {
          cancelOrders(cancelOrder)
          handleClose()
        }}
        titleMsg={'Are you sure to cancel the order ?😥'}
        descMsg={'if you delete your order will be cancelled'}
      />
      <h2>Your Orders</h2>
      <Paper
        sx={{
          // width: '100%',
          overflow: 'hidden',
          width: '100%',
          '@media (min-width: 780px)': {
            width: '60%',
          },
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            style={{ backgroundColor: '#DCDFE3', color: 'white' }}
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      maxWidth: 'auto',
                      '@media(maxWidth: 680px)': {
                        width: '100',
                      },
                    }}
                  >
                    <b>{column.label}</b>
                  </TableCell>
                ))}
                <TableCell>
                  <b>Action</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  //  const value = row[column.id]
                  return (
                    <>
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell key={item._id}>{item.orderNumber}</TableCell>
                        <TableCell key={item.dateOrder}>
                          {item.dateOrder.slice(0, 10)}
                        </TableCell>
                        <TableCell key={index}>
                          <Badge
                            badgeContent={item.status}
                            color="secondary"
                          ></Badge>
                        </TableCell>
                        <TableCell>
                          <ButtonComponent
                            onClick={() => {
                              navigate(`/myorders/${item._id}`)
                            }}
                            data={viewButton}
                            loading={isLoading}
                          />
                          {item.status === 'pending' ? (
                            <ButtonComponent
                              onClick={() => {
                                setCancelOrder(item._id)
                                setOpen(true)
                              }}
                              data={cancelButton}
                              loading={isLoading}
                            />
                          ) : undefined}
                        </TableCell>
                      </TableRow>
                    </>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Grid>
  )
}
