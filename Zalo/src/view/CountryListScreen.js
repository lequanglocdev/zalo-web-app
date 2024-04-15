// CountryListScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const countriesData = [
  { name: "Afghanistan", dialCode: "+93" },
  { name: "Albania", dialCode: "+355" },
  { name: "Algeria", dialCode: "+213" },
  { name: "American Samoa", dialCode: "+1-684" },
  { name: "Andorra", dialCode: "+376" },
  { name: "Angola", dialCode: "+244" },
  { name: "Anguilla", dialCode: "+1-264" },
  { name: "Antarctica", dialCode: "+672" },
  { name: "Antigua and Barbuda", dialCode: "+1-268" },
  { name: "Argentina", dialCode: "+54" },
  { name: "Armenia", dialCode: "+374" },
  { name: "Aruba", dialCode: "+297" },
  { name: "Australia", dialCode: "+61" },
  { name: "Austria", dialCode: "+43" },
  { name: "Azerbaijan", dialCode: "+994" },
  { name: "Bahamas", dialCode: "+1-242" },
  { name: "Bahrain", dialCode: "+973" },
  { name: "Bangladesh", dialCode: "+880" },
  { name: "Barbados", dialCode: "+1-246" },
  { name: "Belarus", dialCode: "+375" },
  { name: "Belgium", dialCode: "+32" },
  { name: "Belize", dialCode: "+501" },
  { name: "Benin", dialCode: "+229" },
  { name: "Bermuda", dialCode: "+1-441" },
  { name: "Bhutan", dialCode: "+975" },
  { name: "Bolivia", dialCode: "+591" },
  { name: "Bosnia and Herzegovina", dialCode: "+387" },
  { name: "Botswana", dialCode: "+267" },
  { name: "Brazil", dialCode: "+55" },
  { name: "British Indian Ocean Territory", dialCode: "+246" },
  { name: "British Virgin Islands", dialCode: "+1-284" },
  { name: "Brunei", dialCode: "+673" },
  { name: "Bulgaria", dialCode: "+359" },
  { name: "Burkina Faso", dialCode: "+226" },
  { name: "Burundi", dialCode: "+257" },
  { name: "Cambodia", dialCode: "+855" },
  { name: "Cameroon", dialCode: "+237" },
  { name: "Canada", dialCode: "+1" },
  { name: "Cape Verde", dialCode: "+238" },
  { name: "Cayman Islands", dialCode: "+1-345" },
  { name: "Central African Republic", dialCode: "+236" },
  { name: "Chad", dialCode: "+235" },
  { name: "Chile", dialCode: "+56" },
  { name: "China", dialCode: "+86" },
  { name: "Christmas Island", dialCode: "+61" },
  { name: "Cocos Islands", dialCode: "+61" },
  { name: "Colombia", dialCode: "+57" },
  { name: "Comoros", dialCode: "+269" },
  { name: "Cook Islands", dialCode: "+682" },
  { name: "Costa Rica", dialCode: "+506" },
  { name: "Croatia", dialCode: "+385" },
  { name: "Cuba", dialCode: "+53" },
  { name: "Curacao", dialCode: "+599" },
  { name: "Cyprus", dialCode: "+357" },
  { name: "Czech Republic", dialCode: "+420" },
  { name: "Democratic Republic of the Congo", dialCode: "+243" },
  { name: "Denmark", dialCode: "+45" },
  { name: "Djibouti", dialCode: "+253" },
  { name: "Dominica", dialCode: "+1-767" },
  { name: "Dominican Republic", dialCode: "+1-809, +1-829, +1-849" },
  { name: "East Timor", dialCode: "+670" },
  { name: "Ecuador", dialCode: "+593" },
  { name: "Egypt", dialCode: "+20" },
  { name: "El Salvador", dialCode: "+503" },
  { name: "Equatorial Guinea", dialCode: "+240" },
  { name: "Eritrea", dialCode: "+291" },
  { name: "Estonia", dialCode: "+372" },
  { name: "Ethiopia", dialCode: "+251" },
  { name: "Falkland Islands", dialCode: "+500" },
  { name: "Faroe Islands", dialCode: "+298" },
  { name: "Fiji", dialCode: "+679" },
  { name: "Finland", dialCode: "+358" },
  { name: "France", dialCode: "+33" },
  { name: "French Polynesia", dialCode: "+689" },
  { name: "Gabon", dialCode: "+241" },
  { name: "Gambia", dialCode: "+220" },
  { name: "Georgia", dialCode: "+995" },
  { name: "Germany", dialCode: "+49" },
  { name: "Ghana", dialCode: "+233" },
  { name: "Gibraltar", dialCode: "+350" },
  { name: "Greece", dialCode: "+30" },
  { name: "Greenland", dialCode: "+299" },
  { name: "Grenada", dialCode: "+1-473" },
  { name: "Guam", dialCode: "+1-671" },
  { name: "Guatemala", dialCode: "+502" },
  { name: "Guernsey", dialCode: "+44-1481" },
  { name: "Guinea", dialCode: "+224" },
  { name: "Guinea-Bissau", dialCode: "+245" },
  { name: "Guyana", dialCode: "+592" },
  { name: "Haiti", dialCode: "+509" },
  { name: "Honduras", dialCode: "+504" },
  { name: "Hong Kong", dialCode: "+852" },
  { name: "Hungary", dialCode: "+36" },
  { name: "Iceland", dialCode: "+354" },
  { name: "India", dialCode: "+91" },
  { name: "Indonesia", dialCode: "+62" },
  { name: "Iran", dialCode: "+98" },
  { name: "Iraq", dialCode: "+964" },
  { name: "Ireland", dialCode: "+353" },
  { name: "Isle of Man", dialCode: "+44-1624" },
  { name: "Israel", dialCode: "+972" },
  { name: "Italy", dialCode: "+39" },
  { name: "Ivory Coast", dialCode: "+225" },
  { name: "Jamaica", dialCode: "+1-876" },
  { name: "Japan", dialCode: "+81" },
  { name: "Jersey", dialCode: "+44-1534" },
  { name: "Jordan", dialCode: "+962" },
  { name: "Kazakhstan", dialCode: "+7" },
  { name: "Kenya", dialCode: "+254" },
  { name: "Kiribati", dialCode: "+686" },
  { name: "Kosovo", dialCode: "+383" },
  { name: "Kuwait", dialCode: "+965" },
  { name: "Kyrgyzstan", dialCode: "+996" },
  { name: "Laos", dialCode: "+856" },
  { name: "Latvia", dialCode: "+371" },
  { name: "Lebanon", dialCode: "+961" },
  { name: "Lesotho", dialCode: "+266" },
  { name: "Liberia", dialCode: "+231" },
  { name: "Libya", dialCode: "+218" },
  { name: "Liechtenstein", dialCode: "+423" },
  { name: "Lithuania", dialCode: "+370" },
  { name: "Luxembourg", dialCode: "+352" },
  { name: "Macau", dialCode: "+853" },
  { name: "Macedonia", dialCode: "+389" },
  { name: "Madagascar", dialCode: "+261" },
  { name: "Malawi", dialCode: "+265" },
  { name: "Malaysia", dialCode: "+60" },
  { name: "Maldives", dialCode: "+960" },
  { name: "Mali", dialCode: "+223" },
  { name: "Malta", dialCode: "+356" },
  { name: "Marshall Islands", dialCode: "+692" },
  { name: "Mauritania", dialCode: "+222" },
  { name: "Mauritius", dialCode: "+230" },
  { name: "Mayotte", dialCode: "+262" },
  { name: "Mexico", dialCode: "+52" },
  { name: "Micronesia", dialCode: "+691" },
  { name: "Moldova", dialCode: "+373" },
  { name: "Monaco", dialCode: "+377" },
  { name: "Mongolia", dialCode: "+976" },
  { name: "Montenegro", dialCode: "+382" },
  { name: "Montserrat", dialCode: "+1-664" },
  { name: "Morocco", dialCode: "+212" },
  { name: "Mozambique", dialCode: "+258" },
  { name: "Myanmar", dialCode: "+95" },
  { name: "Namibia", dialCode: "+264" },
  { name: "Nauru", dialCode: "+674" },
  { name: "Nepal", dialCode: "+977" },
  { name: "Netherlands", dialCode: "+31" },
  { name: "Netherlands Antilles", dialCode: "+599" },
  { name: "New Caledonia", dialCode: "+687" },
  { name: "New Zealand", dialCode: "+64" },
  { name: "Nicaragua", dialCode: "+505" },
  { name: "Niger", dialCode: "+227" },
  { name: "Nigeria", dialCode: "+234" },
  { name: "Niue", dialCode: "+683" },
  { name: "North Korea", dialCode: "+850" },
  { name: "Northern Mariana Islands", dialCode: "+1-670" },
  { name: "Norway", dialCode: "+47" },
  { name: "Oman", dialCode: "+968" },
  { name: "Pakistan", dialCode: "+92" },
  { name: "Palau", dialCode: "+680" },
  { name: "Palestine", dialCode: "+970" },
  { name: "Panama", dialCode: "+507" },
  { name: "Papua New Guinea", dialCode: "+675" },
  { name: "Paraguay", dialCode: "+595" },
  { name: "Peru", dialCode: "+51" },
  { name: "Philippines", dialCode: "+63" },
  { name: "Pitcairn", dialCode: "+64" },
  { name: "Poland", dialCode: "+48" },
  { name: "Portugal", dialCode: "+351" },
  { name: "Puerto Rico", dialCode: "+1-787, +1-939" },
  { name: "Qatar", dialCode: "+974" },
  { name: "Republic of the Congo", dialCode: "+242" },
  { name: "Reunion", dialCode: "+262" },
  { name: "Romania", dialCode: "+40" },
  { name: "Russia", dialCode: "+7" },
  { name: "Rwanda", dialCode: "+250" },
  { name: "Saint Barthelemy", dialCode: "+590" },
  { name: "Saint Helena", dialCode: "+290" },
  { name: "Saint Kitts and Nevis", dialCode: "+1-869" },
  { name: "Saint Lucia", dialCode: "+1-758" },
  { name: "Saint Martin", dialCode: "+590" },
  { name: "Saint Pierre and Miquelon", dialCode: "+508" },
  { name: "Saint Vincent and the Grenadines", dialCode: "+1-784" },
  { name: "Samoa", dialCode: "+685" },
  { name: "San Marino", dialCode: "+378" },
  { name: "Sao Tome and Principe", dialCode: "+239" },
  { name: "Saudi Arabia", dialCode: "+966" },
  { name: "Senegal", dialCode: "+221" },
  { name: "Serbia", dialCode: "+381" },
  { name: "Seychelles", dialCode: "+248" },
  { name: "Sierra Leone", dialCode: "+232" },
  { name: "Singapore", dialCode: "+65" },
  { name: "Sint Maarten", dialCode: "+1-721" },
  { name: "Slovakia", dialCode: "+421" },
  { name: "Slovenia", dialCode: "+386" },
  { name: "Solomon Islands", dialCode: "+677" },
  { name: "Somalia", dialCode: "+252" },
  { name: "South Africa", dialCode: "+27" },
  { name: "South Korea", dialCode: "+82" },
  { name: "South Sudan", dialCode: "+211" },
  { name: "Spain", dialCode: "+34" },
  { name: "Sri Lanka", dialCode: "+94" },
  { name: "Sudan", dialCode: "+249" },
  { name: "Suriname", dialCode: "+597" },
  { name: "Svalbard and Jan Mayen", dialCode: "+47" },
  { name: "Swaziland", dialCode: "+268" },
  { name: "Sweden", dialCode: "+46" },
  { name: "Switzerland", dialCode: "+41" },
  { name: "Syria", dialCode: "+963" },
  { name: "Taiwan", dialCode: "+886" },
  { name: "Tajikistan", dialCode: "+992" },
  { name: "Tanzania", dialCode: "+255" },
  { name: "Thailand", dialCode: "+66" },
  { name: "Togo", dialCode: "+228" },
  { name: "Tokelau", dialCode: "+690" },
  { name: "Tonga", dialCode: "+676" },
  { name: "Trinidad and Tobago", dialCode: "+1-868" },
  { name: "Tunisia", dialCode: "+216" },
  { name: "Turkey", dialCode: "+90" },
  { name: "Turkmenistan", dialCode: "+993" },
  { name: "Turks and Caicos Islands", dialCode: "+1-649" },
  { name: "Tuvalu", dialCode: "+688" },
  { name: "U.S. Virgin Islands", dialCode: "+1-340" },
  { name: "Uganda", dialCode: "+256" },
  { name: "Ukraine", dialCode: "+380" },
  { name: "United Arab Emirates", dialCode: "+971" },
  { name: "United Kingdom", dialCode: "+44" },
  { name: "United States", dialCode: "+1" },
  { name: "Uruguay", dialCode: "+598" },
  { name: "Uzbekistan", dialCode: "+998" },
  { name: "Vanuatu", dialCode: "+678" },
  { name: "Vatican", dialCode: "+379" },
  { name: "Venezuela", dialCode: "+58" },
  { name: "Vietnam", dialCode: "+84" },
  { name: "Wallis and Futuna", dialCode: "+681" },
  { name: "Western Sahara", dialCode: "+212" },
  { name: "Yemen", dialCode: "+967" },
  { name: "Zambia", dialCode: "+260" },
  { name: "Zimbabwe", dialCode: "+263" },
];

export default function CountryListScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countriesData);

  const selectCountry = (country) => {
    navigation.navigate("Friend", { selectedCountry: country });
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = countriesData.filter((country) =>
      country.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCountries(filtered);
  };
  return (
    <ScrollView>
      <View style={{ marginTop: 40 }}>
        <ImageBackground
          source={require("../image/Untitled.png")}
          style={{ width: 420, height: 60 }}
        >
          <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 20 }}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back-outline" size={24} color="white" />
            </Pressable>
            <TextInput
              style={{
                width: 200,
                fontSize: 18,
                color: "white",
                outlineStyle: "none",
                marginLeft: 20,
              }}
              placeholderTextColor="white"
              placeholder="Tìm kiếm quốc gia"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
        </ImageBackground>
        {filteredCountries.map((country, index) => (
          <Pressable
            key={index}
            onPress={() => selectCountry(country)}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#CCCCCC",
            }}
          >
            <Text>{country.name}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
