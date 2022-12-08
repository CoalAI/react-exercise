import React, { useState, useEffect } from "react";
import { Layout} from "antd";
import { Button, Form, Select } from "antd";
const { Option } = Select;
const { Header, Content, Footer } = Layout;
import { fetchBreeds, fetchSubBreeds, fetchSubbreedImages } from "../../apis";

export default function Dogs() {
  const [breeds, setBreeds] = useState([]);
  const [SubBreeds, setSubBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedSubBreed, setSelectedSubBreed] = useState("");
  const [images, setImages] = useState([]);
  const [noImages, setSelectedNoImages] = useState(0);
  const [imagesToShow, setImagesToShow] = useState([]);
  const [breedError, setBreedError] = useState(false);
  const [subBreedError, setSubBreedError] = useState(false);
  const [imagesError, setImagesError] = useState(false);

  useEffect(() => {
    fetchBreeds().then((_breeds) => {
      var breedsArray = Object.keys(_breeds).map(breed => ({
        value: breed,
        label: breed
      }))
      setBreeds(breedsArray)
    }
    );
  }, []);
  useEffect(() => {
    setSubBreeds([]);
    setSelectedSubBreed("");
    setBreedError(false);
    
    if (selectedBreed) {
      fetchSubBreeds(selectedBreed).then((_subBreeds) => {
        var subBreedsArray = _subBreeds.map(sub_breed => ({
          value: sub_breed,
          label: sub_breed
        }))
        if (subBreedsArray.length == 0) {
          fetchSubbreedImages(selectedBreed).then(arr_images => {
            setImages(arr_images)
          });
        } else {
          setSubBreeds(subBreedsArray)
        }

      }
      );
    }
  }, [selectedBreed]);

  useEffect(() => {
    setSubBreedError(false);
    if (selectedSubBreed.length) {
      fetchSubbreedImages(selectedBreed, selectedSubBreed).then(arr_images => {
        setImages(arr_images)
      });
    }
  }, [selectedSubBreed])

  useEffect(() => {
    setImages([]);
    setSelectedNoImages(0);
  }, [breeds, SubBreeds])

  useEffect(() => {
    setImagesError(false);
  }, [noImages])
  const imageOptions = images.map((image, index) => {
    return {
      value: index + 1,
      lable: index + 1
    }
  })
  const viewImages = () => {
    if (selectedBreed.length == 0) {
      setBreedError(true);
    }
    if (selectedSubBreed.length == 0 && SubBreeds.length > 0) {
      setSubBreedError(true);
    }
    if (noImages == 0) {
      setImagesError(true);
    }
    if (breedError || subBreedError || imagesError) {
      return
    }
    var tempImages = [];
    setImagesToShow([]);
    for (var i = 0; i < noImages; i++) {
      tempImages.push(images[i]);
    }
    setImagesToShow(tempImages);

  }

  return (
    <Layout className="layout" style={{ height: "49rem" }}>
      <Header>
        <div className="logo" />
      </Header>
      <Content
        style={{
          padding: '50px 50px',
        }}
      >
        <div
          className="site-layout-content">
          <Form
            name="advanced_search"
            className="ant-advanced-search-form"
            layout="inline"
          >
            <Form.Item label="Breed">
              <Select
                defaultValue={{
                  value: 'Select',
                  label: 'Select',
                }}
                style={{
                  width: 120,
                }}
                status={breedError ? "error" : ""}
                onChange={(v) => {setImagesToShow([]);setSelectedBreed(v)}}
                options={breeds}
              />
            </Form.Item>
            {(!!selectedBreed && !!SubBreeds.length) &&
              <Form.Item label="Sub Breed">
                <Select
                  defaultValue={{
                    value: 'Select',
                    label: 'Select',
                  }}
                  style={{
                    width: 120,
                  }}
                  status={subBreedError ? "error" : ""}
                  onChange={(v) => {setImagesToShow([]);setSelectedSubBreed(v)}}
                  options={SubBreeds}
                />
              </Form.Item>
            }

            {!!images.length &&
              <Form.Item label="No of Images">
                <Select
                  defaultValue={{
                    value: 'Select',
                    label: 'Select',
                  }}
                  style={{
                    width: 120,
                  }}
                  status={imagesError ? "error" : ""}
                  onChange={(v) => {setImagesToShow([]);setSelectedNoImages(v)}}
                  options={imageOptions}
                />
              </Form.Item>
            }
            <Button onClick={viewImages} type="primary">
              View Images
            </Button>

          </Form>
          {!!noImages && imagesToShow.map(image => <img src={image} key={image} width="150" height="150" style={{ margin: "2rem" }} />)}

        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Created by Coaldev
      </Footer>
    </Layout>
  );
}