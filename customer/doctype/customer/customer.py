# Copyright (c) 2024, P Jugga and contributors
# For license information, please see license.txt

# import frappe
import re
import frappe
from frappe.exceptions import ValidationError
from frappe.model.document import Document
from lay_by_management.customer.doctype.customer.validator import Validator

class Customer(Document):
	def validate(self):
		validator = Validator()
		if self.identification_type == "ID Number":
			if not validator.is_id_number_valid(self.id_number):
				frappe.throw("ID Number is not valid")
    			# raise ValidationError("ID Number is not valid")

		elif self.identification_type == "Passport Number":
			if not validator.is_passport_number_valid(self.passport_number):
				frappe.throw("Passport Number is not valid")
				# raise ValidationError("Passport Number is not valid")
			if not validator.is_passport_country_valid(self.passport_number):
				frappe.throw("Passport Country of Issue is not valid")
				# raise ValidationError("Passport Country of Issue is not valid")
