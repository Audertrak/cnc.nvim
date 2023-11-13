// Pseudocode for defining G-code grammar in grammar.js
module.exports = grammar({
    name: 'gcode',

    extras: $ => [
        /\s/
    ],

    rules: {
        // The entry point for the parser
        source_file: $ => repeat($._statement),

        _statement: $ => choice(
            $.line_number,
            $.command,
            $.comment
        ),

        line_number: $ => /N\d+/,

        command: $ => choice(
            $.g_command,
            $.m_command,
            $.other_command 
        ),

        g_command: $ => seq(
            'G',
            /\d+(\.\d+)?/,
            optional($.parameters)
        ),

        m_command: $ => seq(
            'M',
            /\d+/,
            optional($.parameters)
        ),

        other_command: $ => seq(
            /[A-Z]/,
            optional($.parameters)
        ),

        parameters: $ => repeat1(choice(
            $.coordinate,
            $.feedrate,
            $.spindle_speed,
            $.tool_select,
            $.other_parameter
        )),

        coordinate: $ => seq(
            /[XYZABC]/,
            optional('-'),
            /\d+(\.\d+)?/
        ),

        feedrate: $ => seq(
            'F',
            /\d+(\.\d+)?/
        ),

        spindle_speed: $ => seq(
            'S',
            /\d+/
        ),

        tool_select: $ => seq(
            'T',
            /\d+/
        ),

        other_parameter: $ => seq(
            /[A-Z]/,
            /\d+(\.\d+)?/
        ),

        comment: $ => /;[^\n]*/,
    }
});

