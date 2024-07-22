import frappe
from lay_by_management.customer.doctype.customer.validator import Validator

def is_customer_eligible_for_layby(customer: any, validator: Validator):
    is_id_valid = False
    if customer.identification_type == "ID Number":
        is_id_valid = validator.is_id_number_valid(customer.id_number)

    elif customer.identification_type == "Passport Number":
        is_id_valid = validator.is_passport_number_valid(customer.passport_number) and \
            validator.is_passport_country_valid(customer.passport_number)
            
    return validator.is_cell_number_valid(str(customer.cellphone_number)) and is_id_valid

# Use the execute method to execute after adding eligibility field, and set new value based on requirements
def execute():
    validator = Validator()
    customers = frappe.get_all(doctype="Customer", fields=["identification_type",
                                                           "id_number",
                                                           "passport_number",
                                                           "passport_country_of_origin",
                                                           "cellphone_number",
                                                           "lay_by_eligibility"])
    for customer in customers:
        lay_by_eligibility = int(is_customer_eligible_for_layby(customer, validator))
        frappe.db.set_value("Customer", customer, "lay_by_eligibility", lay_by_eligibility)
