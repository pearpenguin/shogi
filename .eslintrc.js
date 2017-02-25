module.exports = {
    "extends": ["eslint:recommended"],
    "parserOptions": {
    	"sourceType": "module",
    },
    "rules" : {
	    'semi': ['error', 'always'],
	    'no-extra-semi': 0,
	    'indent': ['error', 'tab', {"SwitchCase": 1}],
    }
};
