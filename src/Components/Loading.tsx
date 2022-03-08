import React,{useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BallTriangle } from  'react-loader-spinner';
import moment from 'moment'


const Loading = () => {
    const[data, setData]= useState<type[] | null >();
    const[pageNum, setPageNm]= useState<any | null>(0);
    const[loading, setLoading]= useState<boolean | null>(false);


    interface type{
        created_at:Date,
        author:string,
        title:string,
    }

    
    useEffect(()=>{
        ApiCall(pageNum);
        setTimeout(()=>{
            setPageNm(pageNum+1);
        },1000)  
    },[pageNum])
    
    const ApiCall = (value:type) =>{

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          setLoading(true);
          fetch("https://hn.algolia.com/api/v1/search_by_date?tags=story&page="+ value)
            .then(response => response.json())
            .then((result) => {
                console.log(result.hits);
                  // setData(result.hits);
                  const tmpHits = result.hits.map((hit:type) => {
                    return {
                      title: hit.title,
                      author: hit.author,
                      created_at: hit.created_at
                    };
                  });
                  console.log(tmpHits);
                  setData(tmpHits);
              })
            .finally(()=>{
                setLoading(false);
            }) 
            .catch(error => console.log('error', error));
    }
  return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" data-testid="custom-element">
            <TableHead>
              <TableRow>
                <TableCell align="center">title</TableCell>
                <TableCell align="center">author</TableCell>
                <TableCell align="center">created_at</TableCell>
              </TableRow>
            </TableHead>
           {loading === true ?(
              <BallTriangle color="#00BFFF" height={80} width={80} />
            ):(
            <TableBody>
                { data ? data.map((item:type)=>{
                    return(

                        <TableRow>
                        <TableCell align="center">{item.title}</TableCell>
                        <TableCell align="center">{item.author}</TableCell>
                        <TableCell align="center">
                       {moment(item.created_at).format('DD MMM YYYY')}
                        </TableCell>
                        </TableRow>
                    )
                }): null}
              
            </TableBody>)}
            
            
          </Table>
        </TableContainer>
      );
    }
export default Loading;