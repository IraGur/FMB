"use client";
import { TextInput, Modal, Button } from "flowbite-react";
import { useEffect, useState } from "react";

export default function AddressForm({ openModal, setOpenModal, setAddresses }) {
   const [formData, setFormData] = useState({});
   const [addressData, setAddressData] = useState([]);
   const [isAddressSelected, setIsAddressSelected] = useState(false);

   const onInputChange = (e) => {
      setIsAddressSelected(false);
      const { name, value } = e.target;
      setFormData((prev) => {
         return { ...prev, ...{ [name]: value } };
      });
   };

   const createAddress = async () => {
      console.log(formData);
      try {
         const res = await fetch("/api/addresses", {
            method: "POST",
            body: JSON.stringify(formData),
         });
         const data = await res.json();
         if (data) {
            setOpenModal(false);
            setAddresses(null);
            setFormData({});
         }
      } catch (error) {
         console.error(error);
      }
   };

   const onAddressClick = (dataItem) => {
      setFormData((prev) => {
         return {
            ...prev,
            ...{
               value: dataItem.formatted,
               lat: dataItem.geometry.lat,
               lng: dataItem.geometry.lng,
            },
         };
      });
      setAddressData([]);
      setIsAddressSelected(true);
   };

   const getAddressData = async (addressValue) => {
      const countryCodes =
         "at,be,bg,hr,cy,cz,dk,ee,fi,fr,de,gr,hu,ie,it,lv,lt,lu,mt,nl,pl,pt,ro,sk,si,es,se";
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${addressValue}&key=ba91abc745604e00abfd12a7d1ab0073&countrycode=${countryCodes}`;

      const res = await fetch(url);
      const data = await res.json();

      setAddressData(data.results);
   };

   useEffect(() => {
      const addressValue = formData.value;
      if (!isAddressSelected && addressValue && addressValue.length > 5) {
         console.log(addressValue);
         getAddressData(addressValue);
      }
   }, [formData.value, isAddressSelected]);

   return (
      /* Employee List */
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
         <Modal.Header className="bg-greyvioletl p-2 rounded-t-lg">
            Add New Client Address
         </Modal.Header>
         <Modal.Body>
            <div>
               <div className="space-y-6">
                  <div>
                     <TextInput
                        className="mb-3"
                        id="client-name"
                        placeholder="Enter client name"
                        onChange={onInputChange}
                        type="text"
                        name="label"
                        required
                        value={formData.label || ""}
                     />
                     <TextInput
                        id="address-value"
                        placeholder="Enter client address"
                        onChange={onInputChange}
                        type="text"
                        name="value"
                        required
                        value={formData.value || ""}
                     />
                     <ul>
                        {addressData.map((dataItem, index) => (
                           <li
                              onClick={() => onAddressClick(dataItem)}
                              key={index}
                           >
                              {dataItem.formatted}
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         </Modal.Body>
         <Modal.Footer>
            <Button
               onClick={createAddress}
               className="bg-greyviolet3 hover:bg-greyviolet
p-2 rounded-md w-full"
            >
               Save
            </Button>
         </Modal.Footer>
      </Modal>
   );
}
