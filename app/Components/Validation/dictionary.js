export const validationDictionary = {
  bool: {
    presence: {
      allowEmpty: false,
      message: '^Please Enter a Required Field',
    },
  },

  day: {
    presence: {
      allowEmpty: false,
      message: '^Please Enter a Required Field',
    },
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 31,
      message: '^Must be valid',
    },
  },

  name: {
    presence: {
      message: '^Please Enter an User Name',
    },
  },

  email: {
    presence: {
      message: '^Please Enter an email address',
    },
    email: {
      message: '^Please Enter a valid email address',
    },
  },

  phone: {
    presence: {
      message: '^Please Enter Phone Number',
    },
    length: {
      minimum: 10,
      message: '^Your password must be at least 8 characters',
    },
  },

  password: {
    presence: {
      message: '^Please Enter a password',
    },
    length: {
      minimum: 8,
      message: '^Your password must be at least 8 characters',
    },
  },

  confirm_password: {
    presence: {
      message: '^Please Enter a confirm password',
    },
    length: {
      minimum: 8,
      message: '^Your password must be at least 8 characters',
    },
  },

  country: {
    presence: {
      message: '^Please Select a Country',
    },
  },

  state: {
    presence: {
      message: '^Please Select a State',
    },
  },

  cancer_type: {
    presence: {
      message: '^Please Select a Cancer Type',
    },
  },

  markers_mutations: {
    presence: {
      message: '^Please Select a Markers/Mutations',
    },
  },

  stage: {
    presence: {
      message: '^Please Select a Stage',
    },
  },

  license: {
    presence: {
      message: '^Please Enter a License Number',
    },
  },

  specialization: {
    presence: {
      message: '^Please Select a specialization',
    },
  },

  advocacy: {
    presence: {
      message: '^Please Enter Advocacy or Foundation Name',
    },
  },

  title: {
    presence: {
      message: '^Please Enter a Group Title',
    },
  },

  description: {
    presence: {
      message: '^Please Enter a Group Description',
    },
  },

  generic: {
    presence: {
      allowEmpty: false,
      message: '^Please Enter a Required Field',
    },
  },

  integer: {
    presence: {
      allowEmpty: false,
      message: '^Please Enter a Required Field',
    },
    numericality: {
      greaterThan: 0,
      onlyInteger: true,
      message: '^Must be valid',
    },
  },

  month: {
    presence: {
      allowEmpty: false,
      message: '^Please Enter a Required Field',
    },
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 12,
      message: '^Must be valid',
    },
  },

  phone: {
    presence: {
      allowEmpty: false,
      message: '^Please Enter a Required Field',
    },
    format: {
      pattern: /^[2-9]\d{2}-\d{3}-\d{4}$/,
      message: '^Phone number must be valid',
    },
  },

  // state: {
  //   presence: {
  //     allowEmpty: false,
  //     message: "^Please Enter a Required Field"
  //   },
  //   inclusion: {
  //     within: [
  //       "AK",
  //       "AL",
  //       "AR",
  //       "AZ",
  //       "CA",
  //       "CO",
  //       "CT",
  //       "DC",
  //       "DE",
  //       "FL",
  //       "GA",
  //       "HI",
  //       "IA",
  //       "ID",
  //       "IL",
  //       "IN",
  //       "KS",
  //       "KY",
  //       "LA",
  //       "MA",
  //       "MD",
  //       "ME",
  //       "MI",
  //       "MN",
  //       "MO",
  //       "MS",
  //       "MT",
  //       "NC",
  //       "ND",
  //       "NE",
  //       "NH",
  //       "NJ",
  //       "NM",
  //       "NV",
  //       "NY",
  //       "OH",
  //       "OK",
  //       "OR",
  //       "PA",
  //       "RI",
  //       "SC",
  //       "SD",
  //       "TN",
  //       "TX",
  //       "UT",
  //       "VA",
  //       "VT",
  //       "WA",
  //       "WI",
  //       "WV",
  //       "WY"
  //     ],
  //     message: "^Must be valid"
  //   }
  // },

  zip: {
    presence: {
      allowEmpty: false,
      message: '^Please Enter a Required Field',
    },
    length: {
      is: 5,
      message: '^Zip must be 5 digits long',
    },
  },
};
