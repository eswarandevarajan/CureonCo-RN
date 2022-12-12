import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, ScrollView, Switch, Text} from 'react-native';
import {Button, SelectBox, Input} from '../../../Components';
import {colors} from '../../../themes/themes';
import images from '../../../assets/images';
import styles from '../SignupScreen/Styles';
import {ErrorTxts, Signup_Screen} from '../../../Constants/TextConstants';
import CheckBox from '@react-native-community/checkbox';
import {useSelector} from 'react-redux';
import ToastMessage from '../../../Components/ToastMessage';
import {CureOncoImage} from '../../../Components/CureOncoAtoms';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

const UserTypeComponent = props => {
  const {getRegisterRole} = props;
  const diagnosisMutations = useSelector(
    state => state.AuthReducer?.diagnosisMutations,
  );

  const stages = useSelector(state => state.AuthReducer?.stages);

  const [isUserPatient, setIsUserPatient] = useState(true);
  const [isUserPhysician, setIsUserPhysician] = useState(false);
  const [isUserAdvocacy, setIsUserAdvocacy] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [userType, setUserType] = useState('Patient');

  const patientSchema = yup.object().shape({
    cancerType: yup.string().required(ErrorTxts.UserType_Error.cancerTypeError),
    markersmutations: yup
      .string()
      .required(ErrorTxts.UserType_Error.markersError),
    clinicalTrial: yup.string(),
    stage: yup.string().required(ErrorTxts.UserType_Error.stageError),
  });

  const physicianSchema = yup.object().shape({
    license: yup.string().required(ErrorTxts.UserType_Error.licenseError),
    specialization: yup
      .string()
      .required(ErrorTxts.UserType_Error.specializationError),
    affiliation: yup
      .string()
      .required(ErrorTxts.UserType_Error.affiliationError),
  });

  const advocacySchema = yup.object().shape({
    patientName: yup
      .string()
      .required(ErrorTxts.UserType_Error.patientNameError),
    relationship: yup
      .string()
      .required(ErrorTxts.UserType_Error.relationshipError),
    advocacy: yup.string().required(ErrorTxts.UserType_Error.advocayError),
  });

  const {
    register: patientRegister,
    setValue: patientSetValue,
    handleSubmit: handleSubmitPatient,
    formState: {errors: patientErrors},
    reset: patientReset,
    clearErrors: patientClearErrors,
    setError: patientSetError,
  } = useForm({
    resolver: yupResolver(patientSchema),
  });

  const {
    register: physicianRegister,
    setValue: physicianSetValue,
    handleSubmit: handleSubmitPhysician,
    formState: {errors: physicianErrors},
    reset: physicianReset,
    clearErrors: physicianClearErrors,
  } = useForm({
    resolver: yupResolver(physicianSchema),
  });

  const {
    register: advocacyRegister,
    setValue: advocacySetValue,
    handleSubmit: handleSubmitAdvocacy,
    formState: {errors: advocacyErrors},
    reset: advocacyReset,
    clearErrors: advocacyClearErrors,
  } = useForm({
    resolver: yupResolver(advocacySchema),
  });

  useEffect(() => {
    //Patient
    patientRegister('cancerType');
    patientRegister('markersmutations');
    patientRegister('clinicalTrial');
    patientRegister('stage');
    //Physicain
    physicianRegister('license');
    physicianRegister('specialization');
    physicianRegister('affiliation');
    //Advocay
    advocacyRegister('patientName');
    advocacyRegister('relationship');
    advocacyRegister('advocacy');
  }, [patientRegister, physicianRegister, advocacyRegister]);

  useEffect(() => {
    //Patient
    patientReset({
      cancerType: '',
      markersmutations: '',
      clinicalTrial: '',
      stage: '',
    });
    //Physicain
    physicianReset({
      license: '',
      specialization: '',
      affiliation: '',
    });
    //Advocay
    advocacyReset({
      patientName: '',
      relationship: '',
      advocacy: '',
    });
  }, [patientReset, physicianReset, advocacyReset]);

  const onPatientSelected = () => {
    patientClearErrors();
    setIsUserPatient(true);
    setIsUserPhysician(false);
    setIsUserAdvocacy(false);
    setUserType(Signup_Screen.screen_02.patient_txt);
  };

  const onPhysicianSelected = () => {
    physicianClearErrors();
    setIsUserPatient(false);
    setIsUserPhysician(true);
    setIsUserAdvocacy(false);
    setUserType(Signup_Screen.screen_02.physician_txt);
  };

  const onAdvocacySelected = () => {
    advocacyClearErrors();
    setIsUserPatient(false);
    setIsUserPhysician(false);
    setIsUserAdvocacy(true);
    setUserType(Signup_Screen.screen_02.advocacy_txt);
  };

  const patientComponent = () => {
    return (
      <TouchableOpacity
        style={isUserPatient ? styles.selectedRoleTab : styles.roleTab}
        onPress={onPatientSelected}>
        <CureOncoImage
          style={styles.roleImage}
          source={isUserPatient ? images.patientActive : images.patientInactive}
        />
        <Text style={isUserPatient ? styles.selectedRoleTxt : styles.roleTxt}>
          {Signup_Screen.screen_02.patient_txt}
        </Text>
      </TouchableOpacity>
    );
  };
  const physicianComponent = () => {
    return (
      <TouchableOpacity
        style={isUserPhysician ? styles.selectedRoleTab : styles.roleTab}
        onPress={onPhysicianSelected}>
        <CureOncoImage
          style={styles.roleImage}
          source={
            isUserPhysician ? images.physicianActive : images.physicianInactive
          }
        />
        <Text style={isUserPhysician ? styles.selectedRoleTxt : styles.roleTxt}>
          {Signup_Screen.screen_02.physician_txt}
        </Text>
      </TouchableOpacity>
    );
  };
  const advocacyComponent = () => {
    return (
      <TouchableOpacity
        style={isUserAdvocacy ? styles.selectedRoleTab : styles.roleTab}
        onPress={onAdvocacySelected}>
        <CureOncoImage
          style={styles.roleImage}
          source={
            isUserAdvocacy ? images.caregiverActive : images.caregiverInactive
          }
        />
        <Text style={isUserAdvocacy ? styles.selectedRoleTxt : styles.roleTxt}>
          {Signup_Screen.screen_02.advocacy_txt}
        </Text>
      </TouchableOpacity>
    );
  };

  const selectedCancerType = svalue => {
    if (svalue != null) {
      patientClearErrors('cancerType');
      patientSetValue('cancerType', svalue);
    }
  };

  const selectedMarkers = svalue => {
    if (svalue != null) {
      patientClearErrors('markersmutations');
      patientSetValue('markersmutations', svalue);
    }
  };

  const selectedStage = svalue => {
    if (svalue != null) {
      patientClearErrors('stage');
      patientSetValue('stage', svalue);
    }
  };

  const selectedSpecialization = svalue => {
    if (svalue != null) {
      physicianClearErrors('specialization');
      physicianSetValue('specialization', svalue);
    }
  };

  const onCheckChange = () => {
    isChecked ? setIsChecked(false) : setIsChecked(true);
  };

  const onSubmit = data => {
    onRegister(data);
  };

  const onRegister = async data => {
    if (isChecked) {
      if (isUserPatient) {
        const {cancerType, markersmutations, clinicalTrial, stage} = data ?? {};
        const registerRole = {
          cancerType,
          diagnosicMutation: markersmutations,
          diagnosicStage: stage,
          isUserPatient,
          userType,
        };
        if (switchValue) {
          if (clinicalTrial !== '') {
            registerRole.clinicalTrial = clinicalTrial;
            getRegisterRole(registerRole);
          } else {
            patientSetError(
              'clinicalTrial',
              Signup_Screen.screen_02.trail_error_txt,
            );
          }
        } else {
          getRegisterRole(registerRole);
        }
      } else if (isUserPhysician) {
        const {license, specialization, affiliation} = data ?? {};
        const registerRole = {
          licenseNumber: license,
          specialization,
          affiliation,
          isUserPhysician,
          userType,
        };
        getRegisterRole(registerRole);
      } else if (isUserAdvocacy) {
        const {patientName, relationship, advocacy} = data ?? {};
        const registerRole = {
          patientName,
          relationship,
          advocacy,
          isUserAdvocacy,
          userType,
        };
        getRegisterRole(registerRole);
      }
    } else {
      ToastMessage.error(Signup_Screen.screen_02.terms_error_txt);
    }
  };

  return (
    <View>
      <View style={styles.roleHeaderView}>
        {patientComponent()}
        {physicianComponent()}
        {advocacyComponent()}
      </View>
      <Text style={styles.detailsTxt}>Please enter your details</Text>
      {isUserPatient === true && (
        <View>
          <View style={styles.roleScrollView}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <SelectBox
                dataSource={stages.cancerTypes}
                onSelectedState={selectedCancerType}
                selectType="Cancer"
                isMandatory={true}
                image={true}
                source={images.cancertypeIcon}
                imageStyle={styles.cancerImage}
                selectTitle={Signup_Screen.screen_02.cancer_title_txt}
                stateselected={
                  Signup_Screen.screen_02.cancertype_select_placeholder
                }
                error={patientErrors.cancerType}
              />
              <SelectBox
                dataSource={diagnosisMutations}
                onSelectedState={selectedMarkers}
                selectType="Markers"
                isMandatory={true}
                image={true}
                source={images.markerIcon}
                imageStyle={styles.markerImage}
                selectTitle={Signup_Screen.screen_02.markers_title_txt}
                stateselected={
                  Signup_Screen.screen_02.markers_select_placeholder
                }
                error={patientErrors.markersmutations}
              />

              <View style={styles.entrolledTopView}>
                <Text style={styles.entrolledTxt}>
                  {Signup_Screen.screen_02.entrolled_title_txt}
                </Text>
                <View style={styles.entrolledView}>
                  <Text style={styles.textStyle}>
                    {switchValue ? 'Yes' : 'No'}
                  </Text>
                  <Switch
                    trackColor={{false: '#D4D4D4', true: '#004E8B'}}
                    thumbColor={colors.bg}
                    ios_backgroundColor="#3e3e3e"
                    value={switchValue}
                    onValueChange={count => setSwitchValue(count)}
                  />
                </View>
              </View>
              {switchValue ? (
                <Input
                  placeholder={
                    Signup_Screen.screen_02.entrolled_input_placeholder
                  }
                  editable={true}
                  isMandatory={true}
                  style={styles.multilineInput}
                  containerStyle={styles.multilineInputContainer}
                  multiline={true}
                  onChangeText={text => {
                    patientClearErrors('clinicalTrial');
                    patientSetValue('clinicalTrial', text);
                  }}
                  error={patientErrors.clinicalTrial}
                />
              ) : null}

              <SelectBox
                dataSource={stages.diagnosisStages}
                onSelectedState={selectedStage}
                selectType="Stage"
                isMandatory={true}
                image={true}
                source={images.stagesIcon}
                imageStyle={styles.stageImage}
                selectTitle={Signup_Screen.screen_02.stage_title_txt}
                stateselected={Signup_Screen.screen_02.stage_select_placeholder}
                error={patientErrors.stage}
              />
            </ScrollView>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isChecked}
              onValueChange={onCheckChange}
              tintColors={{false: '#D4D4D4', true: '#004E8B'}}
            />
            <Text style={styles.confirmTxt}>
              Please confirm that you have read,and that you agree to the{' '}
              <Text style={styles.termsTxt}>Terms of use </Text> and
              <Text style={styles.privacyTxt}> Privacy Policy</Text>
            </Text>
          </View>
          <Button
            btnLabel={Signup_Screen.submit_txt}
            btnPress={handleSubmitPatient(onSubmit)}
          />
        </View>
      )}
      {isUserPhysician === true && (
        <View>
          <View style={styles.roleScrollView}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <Input
                placeholder={Signup_Screen.screen_02.license_input_placeholder}
                editable={true}
                isMandatory={true}
                icon={true}
                name={'drivers-license-o'}
                type={'FontAwesome'}
                size={22}
                iconColor={'#9499A6'}
                onChangeText={text => {
                  physicianClearErrors('license');
                  physicianSetValue('license', text);
                }}
                error={physicianErrors.license}
              />
              <SelectBox
                dataSource={stages.cancerTypes}
                onSelectedState={selectedSpecialization}
                selectType="Specialization"
                isMandatory={true}
                image={true}
                source={images.cancertypeIcon}
                imageStyle={styles.cancerImage}
                selectTitle={Signup_Screen.screen_02.specialization_title_txt}
                stateselected={
                  Signup_Screen.screen_02.specialization_select_txt
                }
                error={physicianErrors.specialization}
              />
              <Input
                placeholder={
                  Signup_Screen.screen_02.affiliation_input_placeholder
                }
                editable={true}
                multiline={true}
                image={true}
                source={images.affiliationIcon}
                imageStyles={styles.cancerImage}
                onChangeText={text => {
                  physicianClearErrors('affiliation');
                  physicianSetValue('affiliation', text);
                }}
                error={physicianErrors.affiliation}
              />
            </ScrollView>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isChecked}
              onValueChange={onCheckChange}
              tintColors={{false: '#D4D4D4', true: '#004E8B'}}
            />
            <Text style={styles.confirmTxt}>
              Please confirm that you have read,and that you agree to the{' '}
              <Text style={styles.termsTxt}>Terms of use </Text> and
              <Text style={styles.privacyTxt}> Privacy Policy</Text>
            </Text>
          </View>
          <Button
            btnLabel={Signup_Screen.submit_txt}
            btnPress={handleSubmitPhysician(onSubmit)}
          />
        </View>
      )}
      {isUserAdvocacy === true && (
        <View>
          <View style={styles.roleScrollView}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <Input
                placeholder={'Enter Cancer Patient Name'}
                editable={true}
                icon={true}
                name={'person'}
                type={'Octicons'}
                size={22}
                iconColor={'#9499A6'}
                onChangeText={text => {
                  advocacyClearErrors('patientName');
                  advocacySetValue('patientName', text);
                }}
                error={advocacyErrors.patientName}
              />
              <Input
                placeholder={'Relationship'}
                editable={true}
                icon={true}
                name={'drivers-license-o'}
                type={'FontAwesome'}
                size={22}
                iconColor={'#9499A6'}
                onChangeText={text => {
                  advocacyClearErrors('relationship');
                  advocacySetValue('relationship', text);
                }}
                error={advocacyErrors.relationship}
              />
              <Input
                placeholder={
                  Signup_Screen.screen_02.advocacyname_input_placeholder
                }
                editable={true}
                isMandatory={true}
                style={styles.multilineInput}
                containerStyle={styles.multilineInputContainer}
                multiline={true}
                onChangeText={text => {
                  advocacyClearErrors('advocacy');
                  advocacySetValue('advocacy', text);
                }}
                error={advocacyErrors.advocacy}
              />
            </ScrollView>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isChecked}
              onValueChange={onCheckChange}
              tintColors={{false: '#D4D4D4', true: '#004E8B'}}
            />
            <Text style={styles.confirmTxt}>
              Please confirm that you have read,and that you agree to the{' '}
              <Text style={styles.termsTxt}>Terms of use </Text> and
              <Text style={styles.privacyTxt}> Privacy Policy</Text>
            </Text>
          </View>
          <Button
            btnLabel={Signup_Screen.submit_txt}
            btnPress={handleSubmitAdvocacy(onSubmit)}
          />
        </View>
      )}
    </View>
  );
};

export default UserTypeComponent;
