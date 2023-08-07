const InvariantError = require('../../exceptions/InvariantError');
const { ExportNotesPayloadSchema } = require('./schema');

const ExportNotesValidator = {
  validateExportNotesPayload: (payload) => {
    const validationResult = ExportNotesPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ExportNotesValidator;
