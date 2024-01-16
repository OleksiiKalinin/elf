import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Touchable,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
// import Hairdresser from '../../assets/images/Fryzjer.png';
// import Cook from '../../assets/images/kucharz.png';
// import Baker from '../../assets/images/Piekarz.png';
import Other from '../../assets/images/Inny.png';
// import Florist from '../../assets/images/Florysta.png';
// import Courier from '../../assets/images/Kurier.png';
// import Salesman from '../../assets/images/Kasjer.png';
import { NewUserAdvertType, UserAdvertType } from '../../store/reducers/types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import SvgIcon from '../atoms/SvgIcon';
import Typography from '../atoms/Typography';
import Colors from '../../colors/Colors';

const LogoWidth = 120;

// const AdvertLarge: React.FC<UserAdvertType> = props => {
const AdvertLarge: React.FC<NewUserAdvertType> = props => {
  const { benefits_ids, company_id, description, duties_ids, expiration_time, job_experience_id, job_mode_id, job_position_id, job_start_id, known_languages_id, location, requirements_ids, salary_amount_low, salary_amount_up, salary_tax_type_id, salary_time_type_id, trial_time_id, trial_type_id, type_of_contract_id, working_hour_down, working_hour_up, id } = props;
  const { jobIndustries, userCompany, jobSalaryTaxes } = useTypedSelector(state => state.general);

  return (
    <View style={styles.Background}>
      <ImageBackground
        source={
          // props.job === 'Fryzjer'
          //   ? Hairdresser
          //   : props.job === 'Kucharz'
          //     ? Cook
          //     : props.job === 'Piekarz'
          //       ? Baker
          //       : props.job === 'Florysta'
          //         ? Florist
          //         : props.job === 'Kurier'
          //           ? Courier
          //           : props.job === 'Sprzedawca'
          //             ? Salesman
          //             : 
          Other
        }
        resizeMode="cover"
        style={{ height: 220 }}
      />
      <View style={styles.Card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 34 }}>
          <View style={{ width: 36 }}>
            {false && <SvgIcon icon="ukraine" />}
          </View>
          <View style={{ position: 'relative' }}>
            {userCompany?.logo && <Image
              source={{ uri: userCompany.logo.path }}
              style={styles.Avatar}
              resizeMode='cover'
            />}
          </View>
          <View style={{ width: 36 }}>
            {/* {false && <IconButton style={{ marginTop: -10, marginRight: -10 }} onPress={() => { }} icon={<SvgIcon icon="share" />} />} */}
          </View>
        </View>
        <View style={styles.profileSection}>
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Typography variant="h5" weight="Bold">
              {jobIndustries.find(curr => curr.id === userCompany?.job_industry)?.job_positions.find(curr => curr.id === job_position_id)?.name}
            </Typography>
            <Typography variant="h5" weight="SemiBold" color={Colors.Basic700}>
              {userCompany?.short_name}
            </Typography>
          </View>
        </View>
        <View style={styles.profileSection}>
          <SvgIcon icon="money" style={{ alignSelf: 'center' }} />
          <View style={{ left: 10, alignSelf: 'center' }}>
            <Typography color={Colors.Blue500}>
              {salary_amount_low && salary_amount_up ?
                `${salary_amount_low} - ${salary_amount_up} zł ${{ 2: 'msc', 3: 'godz' }[salary_time_type_id || 2]} ${jobSalaryTaxes.find(el => el.id === salary_tax_type_id)?.name || 'brutto'}`
                :
                'Stawka nieustalona'
              }
            </Typography>
            {/* <Typography color={Colors.Basic600}>etat · wczoraj</Typography> */}
          </View>
        </View>
        {/* <View style={styles.profileSection}>
          <SvgIcon icon="fileDocumentCircle" style={{ alignSelf: 'center' }} />
          <View style={{ left: 10, alignSelf: 'center' }}>
            <Typography weight='Regular'>{props.contract}</Typography>
          </View>
        </View> */}
        <View style={styles.profileSection}>
          <SvgIcon icon="mapMarker2" style={{ alignSelf: 'center' }} />
          <View style={{ left: 10, alignSelf: 'center' }}>
            <Typography>{props.location?.formattedAddress}</Typography>
          </View>
        </View>
        {/* <View style={styles.profileSection}>
          <SvgIcon icon="time" style={{ alignSelf: 'center' }} />
          <View style={{ left: 10 }}>
            <Typography color={Colors.Basic600}>
              Praca od zaraz
            </Typography>
            <Typography weight='Regular' color={Colors.Basic600}>
              Ważne 30 dni
            </Typography>
          </View>
        </View> */}
        {/* {userCompany?.contact_hours && <Typography weight="Regular" textAlign='center' color={Colors.Basic600}>
          Kontakt z firmą {userCompany.contact_hours}
        </Typography>} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Background: {
    backgroundColor: Colors.Basic100,
    // height: 595,
  },
  Bar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderBottom: 2,
    borderBottomColor: Colors.Basic300,
    borderBottomWidth: 1,
  },
  Card: {
    // flexDirection: 'row',
    marginHorizontal: 24,
    backgroundColor: Colors.White,
    borderRadius: 10,
    marginTop: -40,
    // height: 385,
    justifyContent: 'center',
    shadowColor: '#6666',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  cardIcons: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  Icon: {
    backgroundColor: Colors.Basic300,
    marginRight: 8,
    borderRadius: 100,
  },
  Avatar: {
    position: 'absolute',
    top: -60,
    left: -LogoWidth / 2,
    width: LogoWidth,
    height: LogoWidth / 1.5,
    borderRadius: 5
  },
  profileSection: {
    marginBottom: 20,
    flexDirection: 'row',
  },
});

export default AdvertLarge;
