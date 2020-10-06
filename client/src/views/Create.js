import React,{Fragment, useEffect, useState} from 'react';
import styled from 'styled-components';
import CreatableSelect from 'react-select/creatable';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import MarkunreadMailboxOutlinedIcon from '@material-ui/icons/MarkunreadMailboxOutlined';
import { Button, Grid, TextField } from '@material-ui/core';
import MainNav from '../components/MainNav';

const Container = styled.div`
  background:white;
  padding:20px;
  display: flex;
  flex-direction: column;
  margin-left: 120px;
  margin-right: 50px;
  margin-top: 20px;
  border-color: rgb(224, 231, 255);
  border-radius: 15px;
  border-width: 1px;
  border-style: solid;
  input::-webkit-input-placeholder {
    font-style:italic;
    color:#989494;
  }
  .react-tagsinput {
    height: 44px;
    background: rgb(245,247,252);
    border:none;
    padding: 10px;
    overflow: auto;
    margin-top:10px;
  }
  .react-tagsinput-tag {
    background-color: hsl(0,0%,90%);
    border:none;
    font-size: 14px;
    color:black;
  }
  .react-tagsinput-remove {
    color:black;
  }
`

const Input = styled.div`
  input {
    padding: 10px;
    width: 100%;
    height: 44px;
    margin-top: 12px;
    outline: none;
    border-style: none;
    background: rgb(245, 247, 252);
  }
`
const ConfigDes = styled.div`
  font-size:18px;
  margin-top:20px;
  margin-bottom:20px;
  display:flex;
  align-items:center;
  span {
    border-bottom:3px dotted #dedada;
    margin-left: 8px;
  }
`
const SubmitButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top:20px;
  cursor:pointer;
  button {
    background:green;
    color:white;
    border: none;
    padding: 10px;
    height: 40px;
  }
  
`
const customStyles = {
  control: (provided) => ({
    ...provided,
    height: 44,
    marginTop: 12
  }),
  
}

const Create = (props) => {
  const [title, settitle] = useState('');
  const [mapData, setMapData] = useState([]);
  const [saved, setsaved] = useState(false)
  const [places, setPlaces] = useState([])  
  
  useEffect(() => {
    let data = places.map(place => {
      return {
        name:place,
        coordinates: [],
        neighbours: [],
        real_life_coordinates:[]
      }
    })
    setMapData(data)
  },[places])

  useEffect(() => {
    console.log('mapdaa',mapData);
    
  }, [mapData])

  const createMap = async() => {
    let objectMap = mapData.reduce((curr,val) => {
      return {...curr,[val.name]:{
        coordinates:val.coordinates,
        real_life_coordinates:val.real_life_coordinates,
        neighbours:val.neighbours
      }}
    },{})
    const postData = JSON.stringify({
      title,
      map:objectMap
    })
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: postData
    };
    let result = await fetch("/api/map/",requestOptions);
    let data = await result.json();
    if(data.message=='success') {
      alert('New map was created successfully');
      props.history.push('/')
    }
    console.log(objectMap);
  }
  return (<div>
      <MainNav/>
      <Container>
        <ConfigDes>
          <MapOutlinedIcon/>{' '}
          <span>Create a New Map</span>
        </ConfigDes>
        <Grid container spacing={2} style={{marginTop: 10}} >
          <Grid item xs={12} md={12}>
            <Input>
              <input 
              type="text"
              value={title}
              id="title"
              onChange={e => settitle(e.target.value)}
              placeholder="Enter title"
              /> 
            </Input>
          </Grid>
          <Grid item xs={12} md={12} >
            <label htmlFor="places">Assign Places</label>
            <TagsInput 
              value={places} 
              onChange={(val) => setPlaces(val)}
              disabled={saved}
              id="places"
              inputProps = {{
                placeholder: 'Place..'
              }}
              />
          </Grid>
          <Grid justify="flex-end" container item xs={12} md={12}>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setsaved(!saved)}
            >
              {saved?'Reset':'Save'}
            </Button>
          </Grid>
        </Grid>
        { saved && <Fragment>
            <ConfigDes>
              <MarkunreadMailboxOutlinedIcon/> {' '}
              <span>Assign Details</span>
            </ConfigDes> 
            
            <Grid container spacing={2}>
              {
                mapData.map((place,index) => {
                  return <Fragment key={`place${index}`}>
                    <Grid item md={12} xs={12}>
                      <span>{place.name}</span>
                    </Grid>
                    <Grid item md={2} xs={2}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Coordinate X"
                        type="number"
                        size="small"
                        value={mapData[index].coordinates[0]}
                        onChange={e => setMapData(prev => {
                          let data = prev;
                          data[index].coordinates[0] = Number(e.target.value)
                          return data;
                        })}
                      />
                    </Grid>
                    <Grid item md={2} xs={2}>
                      <TextField 
                        variant="outlined" 
                        fullWidth
                        type="number"
                        label="Coordinate Y"
                        size="small"
                        value={mapData[index].coordinates[1]}
                        onChange={e => setMapData(prev => {
                          let data = prev;
                          data[index].coordinates[1] = Number(e.target.value)
                          return data;
                        })}
                      />
                    </Grid>
                    <Grid item md={2} xs={2}>
                      <TextField 
                        variant="outlined"  
                        fullWidth
                        label="Lat"
                        type="number"
                        size="small"
                        value={mapData[index].real_life_coordinates[0]}
                        onChange={e => setMapData(prev => {
                          let data = prev;
                          data[index].real_life_coordinates[0] = Number(e.target.value)
                          return data;
                        })}
                      />
                    </Grid>
                    <Grid item md={2} xs={2}>
                      <TextField 
                        variant="outlined" 
                        fullWidth
                        type="number"
                        label="Long"
                        size="small"
                        value={mapData[index].real_life_coordinates[1]}
                        onChange={e => setMapData(prev => {
                          let data = prev;
                          data[index].real_life_coordinates[1] = Number(e.target.value)
                          return data;
                        })}
                      />
                    </Grid>
                    <Grid item md={4} xs={2}>
                      <CreatableSelect
                        isMulti
                        onChange={(newValue,actionMeta) => {
                          let data = newValue;
                          if(!newValue) {
                            data = [];
                          }
                          setMapData(prev => {
                            let val = prev;
                            val[index].neighbours = data.map(loc => loc.value )
                            return val;
                          })
                        }}
                        placeholder={'Enter Neighbours'}
                        options={places.filter(loc => loc!=place.name).map(pos => {
                          return {value:pos,label:pos}
                        })
                        }
                      />
                    </Grid>
                  </Fragment>
                })
              }
            </Grid>
            <SubmitButton>
              <button onClick={createMap}>
                Create Map
              </button>
            </SubmitButton> 
          </Fragment>
        }
        
        
      </Container>
    </div>
  )
}

export default Create