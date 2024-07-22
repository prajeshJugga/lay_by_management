# Introduction
The purpose of this repository is to act as the submission for the Software ENgineer Assessment for Faro Fashion.

# Limitations of Design
1. A few poor design decisions were made on my part, mainly to do with client and server validation of fields.
I decided to implement separate client and server side scripts to deal with validation of fields, instead of
attempting the use of hooks as mentioned in the Hints. The use of hooks would've been a better design decision
particularly for maintaining the solution.

2. Furthermore, in learning the form events, I incorrectly used the `save` event as the event on which to validate
fields, instead of the validate field. This is not ideal at all since it defeats the purpose of validation by inserting
records that are invalid anyways.

3. The backend validation allows duplicate records to be created, since there isn't a check for either ID or Passport Numbers, which are both unique data types. This should've been easily implemented using a frappe.db.exists() check on customer records by ID / Passport Numbers.

4. There are no tests which I would've ideally tried to create. This means the behaviour of the app is not fully tested and relies on manual tests.