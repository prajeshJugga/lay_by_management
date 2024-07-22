// Copyright (c) 2024, P Jugga and contributors
// For license information, please see license.txt

// Design flaw was duplication of code between client and backend script validation
// I should've used hooks as recommended in the hints to avoid this, since mainatenance of two different scripts
// is very error-prone

frappe.ui.form.on('Customer', {
	// refresh: function(frm) {

	// }
	before_load(frm) {
		if (frm.doc.identification_type) {
			frm.toggle_display(['id_number'], frm.doc.identification_type === "ID Number");
			frm.toggle_display(['passport_number', 'passport_country_of_origin'], frm.doc.identification_type === "Passport Number");
			// frm.save();
		} else {
			frm.toggle_display(['id_number', 'passport_number', 'passport_country_of_origin'], false);
			// frm.save();
		}
	},
	// When identification_type changes, display either ID or Passport fields based on the input
	identification_type(frm) {
		console.log("frm.doc.identification_type", frm.doc.identification_type);
		if (frm.doc.identification_type) {
			frm.toggle_display(['id_number'], frm.doc.identification_type === "ID Number");
			frm.toggle_display(['passport_number', 'passport_country_of_origin'], frm.doc.identification_type === "Passport Number");
			// frm.save();
			// frm.validate();
		}
	},

	passport_number(frm) {
		const is_passport_valid = (frm.doc.passport_number && frm.doc.passport_number.length === 9) ? true : false;
		console.log("is_passport_valid", is_passport_valid);
		const is_passport_country_valid = (frm.doc.passport_country_of_origin) ? true : false;
		console.log("is_passport_country_valid", is_passport_country_valid);
		if (is_passport_valid && is_passport_country_valid) {
			frm.save();
		}
	},

	passport_country_of_origin(frm) {
		const is_passport_valid = (frm.doc.passport_number && frm.doc.passport_number.length === 9) ? true : false;
		console.log("is_passport_valid", is_passport_valid);
		const is_passport_country_valid = (frm.doc.passport_country_of_origin) ? true : false;
		console.log("is_passport_country_valid", is_passport_country_valid);
		if (is_passport_valid && is_passport_country_valid) {
			frm.save();
		}
	},

	id_number(frm) {
		const is_id_valid = (frm.doc.id_number && frm.doc.id_number.toString().length === 13) ? true : false;
		if (is_id_valid) {
			frm.save();
		}
	},

	cellphone_number(frm) {
		const is_cell_number_valid = (frm.doc.cellphone_number) ? true : false;
		console.log(frm.doc.cellphone_number);
		if (is_cell_number_valid) {
			frm.save();
		}
	},

	// TODO: Find a better event to work on instead of save
	after_save(frm) {
	// before_submit(frm) {
	// on_validate(frm) {
		console.log("here");
		const is_cell_number_valid = (frm.doc.cellphone_number) ? true : false;
		console.log("is_cell_number_valid", is_cell_number_valid);
		const is_id_type_valid = (frm.doc.identification_type && frm.doc.identification_type !== "None") ? true : false;
		console.log("is_id_type_valid", is_id_type_valid);
		const is_id_valid = (frm.doc.id_number && frm.doc.id_number.toString().length === 13) ? true : false;
		console.log("is_id_valid", is_id_valid);
		const is_passport_valid = (frm.doc.passport_number && frm.doc.passport_number.length === 9) ? true : false;
		console.log("is_passport_valid", is_passport_valid);
		const is_passport_country_valid = (frm.doc.passport_country_of_origin) ? true : false;
		console.log("is_passport_country_valid", is_passport_country_valid);
		const is_customer_eligible_for_lay_by = is_cell_number_valid && is_id_type_valid && 
			(is_id_valid || (is_passport_valid && is_passport_country_valid));
		frm.doc.lay_by_eligibility = is_customer_eligible_for_lay_by;
		console.log("frm.doc.lay_by_eligibility", frm.doc.lay_by_eligibility);
	}

});
