import re


class Validator:
    def is_id_number_valid(self, id_number: int) -> bool:
        if len(str(id_number)) == 13:
            return True
        return False
    
    def is_passport_number_valid(self, passport_number: str) -> bool:
        if len(str(passport_number)) == 9:
            return True
        return False
	
    def is_passport_country_valid(self, passport_country_name: str | None) -> bool:
        if passport_country_name != None:
            return True
        return False
	
    def is_cell_number_valid(self, cell_number: str) -> bool:
        validate_phone_number_pattern = "^\\+?[1-9][0-9]{7,14}$"
        match = re.match(validate_phone_number_pattern, cell_number) 
        if match != None:
            return True
        return False