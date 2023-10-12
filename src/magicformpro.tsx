// @ts-nocheck
import React, { useState } from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"
import * as PhosphorIcons from "phosphor-react"
import {
    CheckCircle,
    Warning,
    Eye,
    EyeSlash,
    CaretDown,
    ArrowLeft,
    PaperPlaneTilt as Icon,
} from "phosphor-react"

/*
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */


export function MagicFormPro(props: any) {
  const [inputWidth, setInputWidth] = useState<string>("100%");

  const handleWidthChange = (newWidth: string) => {
    setInputWidth(newWidth);
  };

    const [formValues, setFormValues] = React.useState({})
    const [validationErrors, setValidationErrors] = React.useState({})
    const [inputValues, setInputValues] = React.useState({})
    const [toastVisible, setToastVisible] = useState(false)
    const [fieldActive, setFieldActive] = useState({})
    const [showPassword, setShowPassword] = useState({})

    const [isHovered, setIsHovered] = useState(false)
    const [activeHoverField, setActiveHoverField] = useState(null)
    const [windowWidth, setWindowWidth] = React.useState(0) // Set initial state to 0
    const [currentStep, setCurrentStep] = useState(1)
    const isHigherThanStep1 = currentStep > 1

    React.useEffect(() => {
        // Now we're in the browser, we can safely access `window`
        setWindowWidth(window.innerWidth)

        const handleResize = () => setWindowWidth(window.innerWidth)

        window.addEventListener("resize", handleResize)

        // Don't forget to clean up the event listener on component unmount
        return () => window.removeEventListener("resize", handleResize)
    }, []) // Empty dependency array means this effect runs once on mount

    const handleIconClick = () => {}
    const handleFieldActive = (fieldName, isActive) => {
        setFieldActive((prevState) => ({
            ...prevState,
            [fieldName]: isActive,
        }))
    }

    const countries = [
        { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
        { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
        { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
        { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
        { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
        { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
        { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
        { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
        { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
        { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
        { code: "RU", name: "Russia", dialCode: "+7", flag: "🇷🇺" },
        { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
        { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
        { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
        { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦" },
        { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
        { code: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷" },
        { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
        { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
        { code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭" },
        { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
        { code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
        { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
        { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
        // Add more countries...
    ]

    const hasMoreSteps = () => {
        const nextSteps = props.inputTypes?.filter(
            (input) => input.step === `Step ${currentStep + 1}`
        )
        return nextSteps?.length > 0
    }

    const getTotalSteps = () => {
        const steps = props.inputTypes?.map((input) => input.step)
        const uniqueSteps = [...new Set(steps)] // Remove duplicates
        return uniqueSteps.length
    }

    const goBackOneStep = () => {
        console.log("goBackOneStep is called") // Debugging line
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const StepIndicator = ({ step, isCurrent, isCompleted }) => {
        let backgroundColor
        if (isCurrent) backgroundColor = props.stepStyle.current
        // Or any color for the current step
        else if (isCompleted) backgroundColor = props.stepStyle.previous
        // Or any color for completed steps
        else backgroundColor = props.stepStyle.next // Or any color for future steps

        const handleClick = () => {
            if (!isCurrent && isCompleted) setCurrentStep(step)
        }

        return (
            <motion.div
                onClick={handleClick}
                style={{
                    height: "14px", // Or any size
                    width: "14px", // Or any size
                    borderRadius: "50%",
                    backgroundColor,
                    margin: "8px",
                    cursor: isCompleted ? "pointer" : "default",
                }}
                whileHover={step < currentStep ? { scale: 1.25 } : {}}
            ></motion.div>
        )
    }

    const Slider = ({ currentStep, totalSteps }) => {
        const progress = (currentStep / totalSteps) * 100

        return (
            <div style={{ width: "100%" }}>
                <div
                    style={{
                        height: "10px",
                        width: "100%",
                        backgroundColor: props.stepStyle.next,
                        borderRadius: "5px",
                    }}
                >
                    <div
                        style={{
                            height: "100%",
                            width: `${progress}%`,
                            backgroundColor: props.stepStyle.current,
                            borderRadius: "5px",
                            transition: "width 0.3s ease-in-out",
                        }}
                    />
                </div>
                {currentStep > 1 && (
                    <div
                        style={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            onClick={(e) => {
                                goBackOneStep()
                            }}
                            style={{
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "row",
                                gap: 4,
                                alignItems: "center",
                            }}
                        >
                            <ArrowLeft
                                weight="bold"
                                style={{
                                    ...props.stepStyle.font,
                                    color: props.stepStyle.current,
                                }}
                            />
                            <p
                                style={{
                                    ...props.stepStyle.font,
                                    color: props.stepStyle.current,
                                }}
                            >
                                Go back
                            </p>
                        </div>
                    </div>
                )}{" "}
            </div>
        )
    }

    const buttonAlignmentStyles = {
        Left: { alignSelf: "flex-start", width: "auto" },
        Right: { alignSelf: "flex-end", width: "auto" },
        Center: { alignSelf: "center", width: "100%" },
    }[props.buttonStyle.buttonAlignment || "center"]

    const validate = (step) => {
        let errors = {}

        props.inputTypes?.forEach((field) => {
            // Only validate fields in the current step
            if (field.step === `Step ${step}`) {
                if (
                    field.required &&
                    (!formValues[field.name] || formValues[field.name] === "")
                ) {
                    errors = {
                        ...errors,
                        [field.name]: field.validationMessage || "defaultError",
                    }
                } else if (
                    field.type === "email" &&
                    formValues[field.name] &&
                    !validateEmail(formValues[field.name])
                ) {
                    errors = { ...errors, [field.name]: "Invalid email format" }
                }
            }
        })

        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            ...errors,
        }))

        return Object.keys(errors).length === 0
    }

    const validateEmail = (email) => {
        // Email validation regular expression
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        return emailRegex.test(email)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (hasMoreSteps()) {
            // If there are more steps, validate the current step.
            if (validate(currentStep)) {
                // If validation passes, increment the step.
                setCurrentStep(currentStep + 1)
                setValidationErrors({})
            }
        } else {
            // If there are no more steps, validate the last step.
            if (validate(currentStep)) {
                // ...submission logic...
                let submitUrl = ""
                if (props.formProvider === "formspark") {
                    submitUrl = `https://submit-form.com/${props.formId}`
                } else if (props.formProvider === "formspree") {
                    submitUrl = `https://formspree.io/${props.formId}`
                } else if (props.formProvider === "messagebird") {
                    submitUrl = props.formId
                } else if (props.formProvider === "basin") {
                    submitUrl = `https://usebasin.com/f/${props.formId}`
                } else if (props.formProvider === "formcarry") {
                    submitUrl = `https://formcarry.com/s/${props.formId}`
                } else if (props.formProvider === "custom") {
                    submitUrl = props.formId
                } else if (props.formProvider === "zapier") {
                    submitUrl = props.formId
                }
                if (submitUrl) {
                    try {
                        const response = await fetch(submitUrl, {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    props.formProvider === "zapier"
                                        ? "text/plain"
                                        : "application/json",
                                Accept: "application/json",
                            },
                            body: JSON.stringify(formValues),
                        })

                        if (response.ok) {
                            // Form submission was successful
                            handleFormSuccess()
                        } else {
                            // Form submission failed
                            console.log("Form submission failed")
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }

                console.log(formValues)
            }
        }
    }

    const handleFormSuccess = () => {
        // If the request was successful, clear the form
        setFormValues({})
        setCurrentStep(1)
        if (props.success.afterSubmit === "redirect") {
            window.location.href = props.success.redirectURL
        } else {
            setToastVisible(true)
            setTimeout(() => setToastVisible(false), 3000)
        }
    }

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value, type, checked } = event.target

        if (type === "checkbox") {
            const checkboxValues = formValues[name] || []

            if (checked) {
                checkboxValues.push(value)
            } else {
                const index = checkboxValues.indexOf(value)
                if (index > -1) {
                    checkboxValues.splice(index, 1)
                }
            }

            setFormValues({ ...formValues, [name]: checkboxValues })
        } else {
            setFormValues({ ...formValues, [name]: value })
        }

        setValidationErrors({ ...validationErrors, [name]: "" })
    }

    const renderInputTypes = () => {
        const inputsForStep = props.inputTypes?.filter(
            (input) => input.step === `Step ${currentStep}`
        )
        return inputsForStep?.map((field, index) => {
            const error = validationErrors[field.name]
            const ErrorMessage = ({ field, validationErrors, errorColor }) => {
                if (
                    validationErrors[field.name] &&
                    validationErrors[field.name] !== "defaultError"
                ) {
                    return (
                        <div
                            style={{
                                paddingTop: "4px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                                alignItems: "center",
                                color: errorColor,
                                gap: "8px",
                            }}
                        >
                            <Warning
                                size="18px"
                                weight="fill"
                                color={errorColor}
                            />
                            <p style={{ fontSize: "14px" }}>
                                {validationErrors[field.name]}
                            </p>
                        </div>
                    )
                }
                return null // Return null if there's no need to render anything
            }
            const defaultStyle = {
                appearance: "none",
                borderStyle: "solid",
                outline: "none",

                "::-moz-focus-inner": {
                    border: "0",
                },
                "::-moz-focus-outer": {
                    border: "0",
                },
            }

            const defaultInputStyle = {
                backgroundColor:
                    activeHoverField === field.name
                        ? props.inputStyle.styling.extraColorStyles.hoverColor
                        : props.inputStyle.styling.backgroundColor,

                borderWidth: props.inputStyle.styling.borderWidth.isMixed
                    ? `${props.inputStyle.styling.borderWidth.borderTopWidth}px ${props.inputStyle.styling.borderWidth.borderRightWidth}px ${props.inputStyle.styling.borderWidth.borderBottomWidth}px ${props.inputStyle.styling.borderWidth.borderLeftWidth}px`
                    : `${props.inputStyle.styling.borderWidth.defaultValue}px`,

                outline:
                    props.inputStyle.styling.extraColorStyles.useOutline ===
                    false
                        ? "0px"
                        : validationErrors[field.name] &&
                          validationErrors[field.name] !== "" &&
                          activeHoverField === field.name
                        ? `1.5px solid ${props.inputStyle.styling.extraColorStyles.errorColor}` // set error color if field is hovered and there are validation errors
                        : !validationErrors[field.name] ||
                          validationErrors[field.name] === ""
                        ? fieldActive[field.name]
                            ? `1.5px solid ${props.inputStyle.styling.extraColorStyles.activeColor}` // set active color if field is active
                            : activeHoverField === field.name
                            ? `1.5px solid ${props.inputStyle.styling.borderColor}` // set error color if
                            : "none" // if field is neither active nor hovered
                        : "none", // set no outline if there are validation errors and field is not being hovered

                borderColor: validationErrors[field.name]
                    ? props.inputStyle.styling.extraColorStyles.errorColor
                    : fieldActive[field.name]
                    ? props.inputStyle.styling.extraColorStyles.activeColor
                    : activeHoverField === field.name
                    ? props.inputStyle.styling.extraColorStyles.hoverBorderColor
                    : props.inputStyle.styling.borderColor,

                paddingLeft:
                    props.inputStyle.styling.iconPosition === "left" &&
                    field.toggleIcon
                        ? parseInt(props.inputStyle.styling.paddingLeft) +
                          parseInt(props.inputStyle.styling.iconSize) * 1.5
                        : props.inputStyle.styling.paddingLeft,
            }

            const iconPadding = {
                paddingLeft:
                    props.inputStyle.styling.iconPosition === "left" &&
                    field.toggleIcon
                        ? parseInt(props.inputStyle.styling.paddingLeft) +
                          parseInt(props.inputStyle.styling.iconSize) * 1.5
                        : props.inputStyle.styling.paddingLeft,
            }

            console.log(
                "Checkbox BorderWidth:",
                props.inputStyle.checkboxStyle.borderWidth
            )

            const radioStyle = {
                padding: "12px",
                gap: "12px",
                borderColor: props.inputStyle.styling.borderColor,
                display: "flex",
                alignItems: "center",
                margin: "0px",
                borderRadius: props.inputStyle.checkboxStyle.borderRadius,
                borderStyle: "solid",
                borderWidth: props.inputStyle.checkboxStyle.borderWidth,
                marginBottom: props.inputStyle.checkboxStyle.marginBottom,
            }

            const iconStyle = {
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
            }
            const selectStyle = {
                appearance: "none",
                backgroundImage: "none",
                backgroundRepeat: "no-repeat",

                "&::-ms-expand": {
                    display: "none",
                },
            }

            const widthStyle =
                windowWidth <= 420
                    ? { gridColumn: "span 2" }
                    : field.width === "50% Width"
                    ? { gridColumn: "span 1" }
                    : { gridColumn: "span 2" }

            const formStyle = {
                display: "flex",
                flexDirection: "column",
            }
            const IconComponent = PhosphorIcons[field.icon]

            const renderInput = (type, field, showIcon = false, renderIcon) => {
                const sharedStyles = {
                    ...props.inputStyle.styling,
                    ...props.inputStyle.fontStyle,
                    ...props.inputStyle.fontStyle.font,
                    ...defaultStyle,
                    paddingLeft: props.inputStyle.styling.paddingLeft,
                }

                const widthStyle =
                    windowWidth <= 420
                        ? { gridColumn: "span 2" }
                        : field.width === "50% Width"
                        ? { gridColumn: "span 1" }
                        : { gridColumn: "span 2" }

                const inputType =
                    type === "password" && showPassword[field.name]
                        ? "text"
                        : type

                const defaultIconComponent = showIcon ? (
                    <IconComponent
                        style={{
                            [props.inputStyle.styling.iconPosition]:
                                props.inputStyle.styling.iconPosition === "left"
                                    ? "12px"
                                    : props.inputStyle.styling.paddingRight,
                            ...props.inputStyle.fontStyle,
                            ...iconStyle,
                            color: props.inputStyle.styling.iconColor,
                            fontSize: props.inputStyle.styling.iconSize,
                        }}
                    />
                ) : null

                return (
                    <div style={{ ...widthStyle, ...formStyle }}>
                        {field.showLabel && (
                            <label
                                style={{
                                    ...props.inputStyle.fontStyle.labelStyle
                                        .font,
                                    ...props.inputStyle.fontStyle.labelStyle,
                                }}
                                htmlFor={field.name}
                            >
                                {field.label}
                                {field.required ? " *" : ""}
                            </label>
                        )}
                        <div
                            style={{
                                ...widthStyle,
                                ...formStyle,
                                position: "relative",
                            }}
                        >
                            <input
                                type={inputType}
                                name={field.name}
                                value={formValues[field.name] || ""}
                                placeholder={`${field.placeholder}${
                                    field.showLabel
                                        ? ""
                                        : field.required
                                        ? " *"
                                        : ""
                                }`}
                                onChange={handleChange}
                                onMouseEnter={() =>
                                    setActiveHoverField(field.name)
                                }
                                onMouseLeave={() => setActiveHoverField(null)}
                                onFocus={() => {
                                    handleFieldActive(field.name, true)
                                }}
                                onBlur={() => {
                                    handleFieldActive(field.name, false)
                                }}
                                style={{
                                    ...sharedStyles,
                                    ...defaultInputStyle,
                                    ...iconPadding,
                                }}
                            />
                            {field.toggleIcon &&
                                (renderIcon
                                    ? renderIcon()
                                    : defaultIconComponent)}
                        </div>
                        <ErrorMessage
                            field={field}
                            validationErrors={validationErrors}
                            errorColor={
                                props.inputStyle.styling.extraColorStyles
                                    .errorColor
                            }
                        />
                    </div>
                )
            }

            const passwordIcon = () => {
                return showPassword[field.name] ? (
                    <EyeSlash
                        style={iconStyles}
                        onClick={() =>
                            setShowPassword({
                                ...showPassword,
                                [field.name]: !showPassword[field.name],
                            })
                        }
                    />
                ) : (
                    <Eye
                        style={iconStyles}
                        onClick={() =>
                            setShowPassword({
                                ...showPassword,
                                [field.name]: !showPassword[field.name],
                            })
                        }
                    />
                )
            }

            const iconStyles = {
                [props.inputStyle.styling.iconPosition]:
                    props.inputStyle.styling.iconPosition === "left"
                        ? "12px"
                        : props.inputStyle.styling.paddingRight,
                ...props.inputStyle.fontStyle,
                ...iconStyle,
                color: props.inputStyle.styling.iconColor,
                fontSize: props.inputStyle.styling.iconSize,
            }

            switch (field.type) {
                case "text":
                    return renderInput("text", field, true)
                case "email":
                    return renderInput("email", field, true)
                case "url":
                    return renderInput("url", field, true)
                case "password":
                    return renderInput("password", field, false, passwordIcon)
                // Add this case in your switch statement.

                case "number":
                    return (
                        <div style={{ ...widthStyle, ...formStyle }}>
                            {field.showLabel && (
                                <label
                                    style={{
                                        ...props.inputStyle.fontStyle.labelStyle
                                            .font,
                                        ...props.inputStyle.fontStyle
                                            .labelStyle,
                                    }}
                                    htmlFor={field.name}
                                >
                                    {field.label}
                                    {field.required ? " *" : ""}
                                </label>
                            )}
                            <div
                                style={{
                                    ...widthStyle,
                                    ...formStyle,
                                    position: "relative",
                                }}
                            >
                                <input
                                    type="number"
                                    name={field.name}
                                    value={formValues[field.name] || ""}
                                    placeholder={`${field.placeholder}${
                                        field.showLabel
                                            ? ""
                                            : field.required
                                            ? " *"
                                            : ""
                                    }`}
                                    onChange={handleChange}
                                    onMouseEnter={() =>
                                        setActiveHoverField(field.name)
                                    }
                                    onMouseLeave={() =>
                                        setActiveHoverField(null)
                                    }
                                    onFocus={() => {
                                        handleFieldActive(field.name, true)
                                    }}
                                    onBlur={() => {
                                        handleFieldActive(field.name, false)
                                    }}
                                    style={{
                                        ...props.inputStyle.styling,
                                        ...props.inputStyle.fontStyle,
                                        ...props.inputStyle.fontStyle.font,
                                        ...defaultInputStyle,
                                        ...defaultStyle,

                                        paddingLeft:
                                            props.inputStyle.styling
                                                .paddingLeft,
                                    }}
                                />
                            </div>
                            <ErrorMessage
                                field={field}
                                validationErrors={validationErrors}
                                errorColor={
                                    props.inputStyle.styling.extraColorStyles
                                        .errorColor
                                }
                            />
                        </div>
                    )

                case "date":
                    return (
                        <div style={{ ...widthStyle, ...formStyle }}>
                            {field.showLabel && (
                                <label
                                    style={{
                                        ...props.inputStyle.fontStyle.labelStyle
                                            .font,
                                        ...props.inputStyle.fontStyle
                                            .labelStyle,
                                    }}
                                    htmlFor={field.name}
                                >
                                    {field.label}
                                    {field.required ? " *" : ""}
                                </label>
                            )}
                            <div
                                style={{
                                    ...widthStyle,
                                    ...formStyle,
                                    position: "relative",
                                }}
                            >
                                <input
                                    type="date"
                                    name={field.name}
                                    value={formValues[field.name] || ""}
                                    placeholder={`${field.placeholder}${
                                        field.showLabel
                                            ? ""
                                            : field.required
                                            ? " *"
                                            : ""
                                    }`}
                                    onChange={handleChange}
                                    onMouseEnter={() =>
                                        setActiveHoverField(field.name)
                                    }
                                    onMouseLeave={() =>
                                        setActiveHoverField(null)
                                    }
                                    onFocus={() => {
                                        handleFieldActive(field.name, true)
                                    }}
                                    onBlur={() => {
                                        handleFieldActive(field.name, false)
                                    }}
                                    style={{
                                        ...props.inputStyle.styling,
                                        ...props.inputStyle.fontStyle,
                                        ...props.inputStyle.fontStyle.font,
                                        ...defaultInputStyle,
                                        ...defaultStyle,
                                        ...selectStyle,
                                        paddingLeft:
                                            props.inputStyle.styling
                                                .paddingLeft,
                                    }}
                                />
                            </div>
                            <ErrorMessage
                                field={field}
                                validationErrors={validationErrors}
                                errorColor={
                                    props.inputStyle.styling.extraColorStyles
                                        .errorColor
                                }
                            />
                        </div>
                    )

                case "radio":
                    return (
                        <div
                            style={{
                                ...widthStyle,
                                ...formStyle,
                                gridColumn: "span 2",
                            }}
                        >
                            {field.showLabel && (
                                <label
                                    style={{
                                        ...props.inputStyle.fontStyle.labelStyle
                                            .font,
                                        ...props.inputStyle.fontStyle
                                            .labelStyle,
                                    }}
                                    htmlFor={field.name}
                                >
                                    {field.label}
                                    {field.required ? " *" : ""}
                                </label>
                            )}

                            {field.options.map((option, optionIndex) => (
                                <label key={optionIndex} htmlFor={option}>
                                    <div
                                        onMouseEnter={() =>
                                            setActiveHoverField(option)
                                        }
                                        onMouseLeave={() =>
                                            setActiveHoverField(null)
                                        }
                                        style={{
                                            backgroundColor:
                                                activeHoverField === field.name
                                                    ? props.inputStyle.styling
                                                          .extraColorStyles
                                                          .hoverColor
                                                    : props.inputStyle.styling
                                                          .backgroundColor,

                                            ...(activeHoverField === option &&
                                                formValues[field.name] !==
                                                    option && {
                                                    outline: `1.5px solid ${props.inputStyle.styling.borderColor}`,
                                                }),
                                            ...(formValues[
                                                field.name
                                            ]?.includes(option) && {
                                                outline: `1.5px solid ${props.inputStyle.styling.extraColorStyles.activeColor}`,
                                            }),
                                            ...radioStyle,
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            id={option}
                                            name={field.name}
                                            value={option}
                                            checked={
                                                formValues[field.name] ===
                                                option
                                            }
                                            onChange={handleChange}
                                            style={{
                                                flexShrink: 0,
                                                width: inputWidth
                                                    .checkboxStyle.size,
                                                height: props.inputStyle
                                                    .checkboxStyle.size,
                                                marginTop: "0px",
                                                accentColor:
                                                    props.inputStyle
                                                        .checkboxStyle.accent,
                                                colorScheme:
                                                    props.inputStyle
                                                        .checkboxStyle
                                                        .colorScheme,
                                            }}
                                        />
                                        <span
                                            style={{
                                                paddingLeft: "8px",
                                                ...props.inputStyle
                                                    .checkboxStyle.font,
                                                color: props.inputStyle
                                                    .checkboxStyle.color,
                                            }}
                                        >
                                            {option}
                                        </span>
                                    </div>
                                </label>
                            ))}
                            <ErrorMessage
                                field={field}
                                validationErrors={validationErrors}
                                errorColor={
                                    props.inputStyle.styling.extraColorStyles
                                        .errorColor
                                }
                            />
                        </div>
                    )
                case "select":
                    return (
                        <div
                            style={{
                                ...widthStyle,
                                ...formStyle,
                            }}
                        >
                            {field.showLabel && (
                                <label
                                    style={{
                                        ...props.inputStyle.fontStyle.labelStyle
                                            .font,
                                        ...props.inputStyle.fontStyle
                                            .labelStyle,
                                    }}
                                    htmlFor={field.name}
                                >
                                    {field.label}
                                    {field.required ? " *" : ""}
                                </label>
                            )}
                            <div
                                style={{
                                    ...widthStyle,
                                    ...formStyle,
                                    position: "relative",
                                }}
                            >
                                <select
                                    name={field.name}
                                    value={formValues[field.name] || ""}
                                    onChange={handleChange}
                                    onMouseEnter={() =>
                                        setActiveHoverField(field.name)
                                    }
                                    onMouseLeave={() =>
                                        setActiveHoverField(null)
                                    }
                                    onFocus={() => {
                                        handleFieldActive(field.name, true)
                                    }}
                                    onBlur={() => {
                                        handleFieldActive(field.name, false)
                                    }}
                                    style={{
                                        gridColumn: "span 2",
                                        ...props.inputStyle.styling,
                                        ...props.inputStyle.fontStyle,
                                        ...props.inputStyle.fontStyle.font,
                                        ...defaultStyle,
                                        ...defaultInputStyle,
                                        ...selectStyle,
                                        paddingLeft:
                                            props.inputStyle.styling
                                                .paddingLeft,
                                    }}
                                >
                                    <option value="">{`${field.placeholder}${
                                        field.showLabel
                                            ? ""
                                            : field.required
                                            ? " *"
                                            : ""
                                    }`}</option>
                                    {field.options.map(
                                        (option, optionIndex) => (
                                            <option
                                                key={optionIndex}
                                                value={option}
                                            >
                                                {option}
                                            </option>
                                        )
                                    )}
                                </select>
                                <CaretDown
                                    style={{
                                        ...props.inputStyle.fontStyle,
                                        ...iconStyle,
                                        right: props.inputStyle.styling
                                            .paddingRight,
                                        color: props.inputStyle.styling
                                            .iconColor,
                                        fontSize: 13,
                                        weight: "bold",
                                    }}
                                />
                            </div>
                            <ErrorMessage
                                field={field}
                                validationErrors={validationErrors}
                                errorColor={
                                    props.inputStyle.styling.extraColorStyles
                                        .errorColor
                                }
                            />
                        </div>
                    )
                case "textarea":
                    return (
                        <div
                            style={{
                                ...widthStyle,
                                ...formStyle,
                            }}
                        >
                            {field.showLabel && (
                                <label
                                    style={{
                                        ...props.inputStyle.fontStyle.labelStyle
                                            .font,
                                        ...props.inputStyle.fontStyle
                                            .labelStyle,
                                    }}
                                    htmlFor={field.name}
                                >
                                    {field.label}
                                    {field.required ? " *" : ""}
                                </label>
                            )}
                            <textarea
                                name={field.name}
                                placeholder={`${field.placeholder}${
                                    field.showLabel
                                        ? ""
                                        : field.required
                                        ? " *"
                                        : ""
                                }`}
                                value={formValues[field.name] || ""}
                                onChange={handleChange}
                                onMouseEnter={() =>
                                    setActiveHoverField(field.name)
                                }
                                onMouseLeave={() => setActiveHoverField(null)}
                                onFocus={() => {
                                    handleFieldActive(field.name, true)
                                }}
                                onBlur={() => {
                                    handleFieldActive(field.name, false)
                                }}
                                style={{
                                    resize: "none",
                                    gridColumn: "span 2",
                                    ...props.inputStyle.styling,
                                    ...props.inputStyle.fontStyle,
                                    ...props.inputStyle.fontStyle.font,
                                    ...defaultStyle,
                                    ...defaultInputStyle,
                                    paddingLeft:
                                        props.inputStyle.styling.paddingLeft,
                                }}
                                rows={field.rows} // Add this line
                            />
                            <ErrorMessage
                                field={field}
                                validationErrors={validationErrors}
                                errorColor={
                                    props.inputStyle.styling.extraColorStyles
                                        .errorColor
                                }
                            />
                        </div>
                    )

                case "checkbox":
                    return (
                        <div
                            style={{
                                ...widthStyle,
                                ...formStyle,
                                gridColumn: "span 2",
                            }}
                        >
                            {field.showLabel && (
                                <label
                                    style={{
                                        ...props.inputStyle.fontStyle.labelStyle
                                            .font,
                                        ...props.inputStyle.fontStyle
                                            .labelStyle,
                                    }}
                                    htmlFor={field.name}
                                >
                                    {field.label}
                                    {field.required ? " *" : ""}
                                </label>
                            )}

                            {field.options.map((option, optionIndex) => (
                                <label key={optionIndex} htmlFor={option}>
                                    <div
                                        onMouseEnter={() =>
                                            setActiveHoverField(option)
                                        }
                                        onMouseLeave={() =>
                                            setActiveHoverField(null)
                                        }
                                        style={{
                                            backgroundColor:
                                                activeHoverField === field.name
                                                    ? props.inputStyle.styling
                                                          .extraColorStyles
                                                          .hoverColor
                                                    : props.inputStyle.styling
                                                          .backgroundColor,

                                            ...(activeHoverField === option &&
                                                formValues[field.name] !==
                                                    option && {
                                                    outline: `1.5px solid ${props.inputStyle.styling.borderColor}`,
                                                }),
                                            ...(formValues[
                                                field.name
                                            ]?.includes(option) && {
                                                outline: `1.5px solid ${props.inputStyle.styling.extraColorStyles.activeColor}`,
                                            }),
                                            ...radioStyle,
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            id={option}
                                            name={field.name}
                                            value={option}
                                            checked={formValues[
                                                field.name
                                            ]?.includes(option)}
                                            onChange={handleChange}
                                            style={{
                                                flexShrink: 0,
                                                width: inputWidth
                                                    .checkboxStyle.size,
                                                height: props.inputStyle
                                                    .checkboxStyle.size,
                                                marginTop: "0px",
                                                accentColor:
                                                    props.inputStyle
                                                        .checkboxStyle.accent,
                                                colorScheme:
                                                    props.inputStyle
                                                        .checkboxStyle
                                                        .colorScheme,
                                            }}
                                        />
                                        <span
                                            style={{
                                                paddingLeft: "8px",
                                                ...props.inputStyle
                                                    .checkboxStyle.font,
                                                color: props.inputStyle
                                                    .checkboxStyle.color,
                                            }}
                                        >
                                            {option}
                                        </span>
                                    </div>
                                </label>
                            ))}
                            <ErrorMessage
                                field={field}
                                validationErrors={validationErrors}
                                errorColor={
                                    props.inputStyle.styling.extraColorStyles
                                        .errorColor
                                }
                            />
                        </div>
                    )

                default:
                    return null
            }
        })
    }

    console.log('props',props)

    return (
        <div
            style={{
                display: "flex",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    display: toastVisible ? "none" : "flex",
                    pointerEvents: toastVisible ? "none" : "auto",
                    ...props.containerStyle,
                }}
                transition={{ duration: 0.3 }}
            >
                <div
                    style={{
                        ...props.containerStyle,
                        display: "grid",
                        maxWidth: "100%",
                        gridTemplateColumns: "1fr 1fr",
                    }}
                >
                    {renderInputTypes()}
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        ...props.stepStyle,
                    }}
                >
                    <motion.button
                        type="submit"
                        style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                            gap: 8,
                            appearance: "none",
                            borderStyle: "solid",
                            outline: "none",
                            boxShadow: "none",
                            "::-moz-focus-inner": {
                                border: "0",
                            },
                            "::-moz-focus-outer": {
                                border: "0",
                            },
                            ...props.buttonStyle.fontStyle.font,
                            ...props.buttonStyle.fontStyle,
                            ...props.buttonStyle.styling,
                            ...buttonAlignmentStyles,
                        }}
                        whileTap={{ scale: 0.99 }}
                        whileHover={{
                            backgroundColor:
                                props.buttonStyle.styling.hoverColor,
                        }}
                        onClick={handleSubmit}
                    >
                        {props.buttonStyle.styling.showIcon && <Icon />}{" "}
                        {hasMoreSteps()
                            ? props.buttonStyle.buttonNext
                            : props.buttonStyle.buttonSubmit}
                    </motion.button>

                    {getTotalSteps() > 1 && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            {props.stepStyle.stepIndicatorType === "slider" ? (
                                <Slider
                                    currentStep={currentStep}
                                    totalSteps={getTotalSteps()}
                                />
                            ) : (
                                Array.from(
                                    { length: getTotalSteps() },
                                    (_, i) => (
                                        <StepIndicator
                                            key={i + 1}
                                            step={i + 1}
                                            isCurrent={currentStep === i + 1}
                                            isCompleted={currentStep > i + 1}
                                        />
                                    )
                                )
                            )}
                        </div>
                    )}
                </div>
            </form>

            {toastVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        marginTop: "40px",
                        width: "100%",
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <CheckCircle
                        size={props.success.toastIcon}
                        weight="fill"
                        color={props.success.iconColor}
                    />
                    <div style={{ textAlign: "center", marginTop: "12px" }}>
                        <p
                            style={{
                                ...props.success.toastFontTitle.font,
                                ...props.success.toastFontTitle,
                                paddingBottom: "4px",
                            }}
                        >
                            {props.success.messageTitle}
                        </p>
                        <p
                            style={{
                                ...props.success.toastFontText.font,
                                ...props.success.toastFontText,
                            }}
                        >
                            {props.success.messageText}
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
const iconNames = Object.keys(PhosphorIcons)

addPropertyControls(MagicFormPro, {
    formProvider: {
        type: ControlType.Enum,
        title: "Send to",
        options: [
            "formspark",
            "formspree",
            "formcarry",
            "basin",
            "zapier",
            "messagebird",
            "custom",
        ],
        optionTitles: [
            "Formspark",
            "Formspree",
            "Formcarry",
            "Basin",
            "Zapier",
            "Messagebird",
            "Custom",
        ],
        defaultValue: "formcarry",
    },
    formId: {
        type: ControlType.String,
        title: "ID/URL",
        defaultValue: "",
        placeholder: "mdovqgln",
        description: "Enter the ID or URL endpoint from your provider.",
    },
    inputTypes: {
        type: ControlType.Array,

        propertyControl: {
            type: ControlType.Object,
            controls: {
                type: {
                    type: ControlType.Enum,
                    title: "Input Type",
                    options: [
                        "text",
                        "email",
                        "number",
                        "url",
                        "date",
                        "textarea",
                        "password",
                        "select",
                        "radio",
                        "checkbox",
                    ],
                    optionTitles: [
                        "Text input",
                        "Email input",
                        "Number input",
                        "URL input",
                        "Date input",
                        "TextArea input",
                        "Password input",
                        "Dropdown",
                        "Radio input",
                        "Checkbox",
                    ],
                },

                step: {
                    type: ControlType.Enum,
                    title: "Step",
                    options: [
                        "Step 1",
                        "Step 2",
                        "Step 3",
                        "Step 4",
                        "Step 5",
                        "Step 6",
                    ],
                    defaultValue: "Step 1",
                },

                name: {
                    type: ControlType.String,
                    title: "Value",
                    placeholder: "fieldName",
                    description:
                        "The value you enter here will be used in the response.",
                },
                showLabel: {
                    type: ControlType.Boolean,
                    title: "Display Label",
                    defaultValue: true,
                },
                label: {
                    type: ControlType.String,
                    title: "Label",
                    defaultValue: "Label",
                    hidden(props) {
                        return !props.showLabel
                    },
                },

                placeholder: {
                    type: ControlType.String,
                    title: "Placeholder",
                    defaultValue: "Enter Text",
                    hidden: (props) =>
                        ["radio", "date", "checkbox"].includes(props.type),
                },

                options: {
                    type: ControlType.Array,
                    title: "Options",
                    defaultValue: ["Option 1", "Option 2"],
                    hidden: (props) =>
                        props.type !== "radio" &&
                        props.type !== "select" &&
                        props.type !== "checkbox",
                    propertyControl: {
                        type: ControlType.String,
                    },
                },

                rows: {
                    type: ControlType.Number,
                    title: "Rows",
                    defaultValue: 3,
                    hidden: (props) => props.type !== "textarea",
                },

                required: {
                    type: ControlType.Boolean,
                    title: "Required",
                    defaultValue: false,
                },

                validationMessage: {
                    title: "Validation Message",
                    type: ControlType.String,
                    defaultValue: "", // default value
                    hidden: (props) => props.required === false,
                    description:
                        "Leave this field empty to only show error on the border",
                },
                toggleIcon: {
                    type: ControlType.Boolean,
                    title: "Show icon",
                    defaultValue: true,
                    hidden: (props) =>
                        [
                            "password",
                            "number",
                            "select",
                            "textarea",
                            "radio",
                            "date",
                            "checkbox",
                        ].includes(props.type),
                },

                icon: {
                    type: ControlType.Enum,
                    title: "Select icon",
                    options: iconNames,
                    defaultValue: iconNames[0],
                    hidden: (props) =>
                        [
                            "password",
                            "select",
                            "number",
                            "date",
                            "textarea",
                            "radio",
                            "checkbox",
                        ].includes(props.type) || !props.toggleIcon,
                },
                width: {
                    type: ControlType.Enum,
                    title: "Width",
                    options: ["Full Width", "50% Width"],
                    optionTitles: ["Full Width", "1/2 Width"],
                    defaultValue: "Full Width",
                    displaySegmentedControl: true,
                    segmentedControlDirection: "horizontal",
                    hidden: (props) =>
                        ["radio", "checkbox", "textarea"].includes(props.type),
                    propertyControl: {
                        type: ControlType.String,
                    },
                },
            },
        },
    },

    containerStyle: {
        type: ControlType.Object,
        title: "Container",
        controls: {
            gap: {
                type: ControlType.Number,
                title: "Gap",
                defaultValue: 8,
            },
        },
    },

    stepStyle: {
        type: ControlType.Object,
        title: "Steps",
        controls: {
            stepIndicatorType: {
                type: ControlType.Enum,
                title: "Use",
                options: ["slider", "circle"],
                optionTitles: ["Slider", "Circle"],
                defaultValue: "slider",
            },
            gap: {
                type: ControlType.Number,
                title: "Gap",
                defaultValue: 16,
            },
            current: {
                type: ControlType.Color,
                title: "Current step",
                defaultValue: "#2266ff",
            },
            previous: {
                type: ControlType.Color,
                title: "Previous step",
                defaultValue: "#2266ff50",
                hidden: (props) => props.stepIndicatorType === "slider",
            },
            next: {
                type: ControlType.Color,
                title: "Next step",
                defaultValue: "#eeeeee",
            },

            font: {
                type: ControlType.Font,
                controls: "extended",
                hidden: (props) => props.stepIndicatorType === "circle",
            },
        },
    },

    inputStyle: {
        type: ControlType.Object,
        title: "Inputs",
        controls: {
            styling: {
                type: ControlType.Object,
                title: "Styling",
                controls: {
                    backgroundColor: {
                        type: ControlType.Color,
                        title: "Background Color",
                        defaultValue: "#fafafa",
                    },

                    borderColor: {
                        type: ControlType.Color,
                        title: "Border Color",
                        defaultValue: "#dddddd",
                    },

                    borderWidth: {
                        type: ControlType.FusedNumber,
                        title: "Border width",
                        defaultValue: 1,
                        toggleKey: "isMixed",
                        toggleTitles: ["All", "Individual"],
                        valueKeys: [
                            "borderTopWidth",
                            "borderRightWidth",
                            "borderBottomWidth",
                            "borderLeftWidth",
                        ],
                        valueLabels: ["T", "R", "B", "L"],
                        min: 0,
                    },

                    borderRadius: {
                        type: ControlType.Number,
                        title: "Border Radius",
                        defaultValue: 10,
                    },

                    padding: {
                        type: ControlType.FusedNumber,
                        title: "Padding",
                        defaultValue: 0,
                        toggleKey: "isMixed",
                        toggleTitles: ["All", "Individual"],
                        valueKeys: [
                            "paddingTop",
                            "paddingRight",
                            "paddingBottom",
                            "paddingLeft",
                        ],
                        valueLabels: ["T", "R", "B", "L"],
                        min: 0,
                    },

                    iconPosition: {
                        type: ControlType.Enum,
                        title: "Position",
                        options: ["left", "right"],
                        optionTitles: ["Left", "Right"],
                        defaultValue: "right",
                    },
                    iconSize: {
                        type: ControlType.Number,
                        title: "Icon size",
                        defaultValue: 24,
                        min: 0,
                        step: 1,
                    },
                    iconColor: {
                        type: ControlType.Color,
                        title: "Icon Color",
                        defaultValue: "#000000",
                    },

                    extraColorStyles: {
                        type: ControlType.Object,
                        title: "Active / Error",
                        controls: {
                            hoverColor: {
                                type: ControlType.Color,
                                title: "Hover bg Color",
                                defaultValue: "#ffffff",
                            },

                            hoverBorderColor: {
                                type: ControlType.Color,
                                title: "Hover border",
                                defaultValue: "#2266FF25",
                            },

                            activeColor: {
                                type: ControlType.Color,
                                title: "Active Color",
                                defaultValue: "#2266ff",
                            },

                            errorColor: {
                                type: ControlType.Color,
                                title: "Error Color",
                                defaultValue: "#ff0020",
                            },

                            useOutline: {
                                type: ControlType.Boolean,
                                title: "Use outline",
                                defaultValue: true,
                                description:
                                    "This will place a larger outline around the input when selected/hovered/error",
                            },
                        },
                    },
                },
            },

            checkboxStyle: {
                type: ControlType.Object,
                title: "Checkbox/Radio",
                controls: {
                    font: {
                        type: ControlType.Font,
                        controls: "extended",
                    },
                    color: {
                        type: ControlType.Color,
                        title: "Label color",
                        defaultValue: "#000000",
                    },

                    colorScheme: {
                        type: ControlType.Enum,
                        title: "Mode",
                        options: ["light", "dark"],
                        optionTitles: ["Light", "Dark"],
                        defaultValue: "light",
                        displaySegmentedControl: true,
                        segmentedControlDirection: "horizontal",
                    },
                    accent: {
                        type: ControlType.Color,
                        title: "Active color",
                        defaultValue: "#2266ff",
                    },
                    borderWidth: {
                        type: ControlType.Number,
                        title: "Border Width",
                        defaultValue: 1,
                    },

                    borderRadius: {
                        type: ControlType.Number,
                        title: "Border Radius",
                        defaultValue: 10,
                    },

                    size: {
                        type: ControlType.Number,
                        title: "Size",
                        defaultValue: 14,
                        min: 0,
                        step: 1,
                    },
                    marginBottom: {
                        type: ControlType.Number,
                        title: "Space between",
                        defaultValue: 4,
                    },
                },
            },

            fontStyle: {
                type: ControlType.Object,
                title: "Fonts",
                controls: {
                    font: {
                        type: ControlType.Font,
                        controls: "extended",
                    },

                    color: {
                        type: ControlType.Color,
                        title: "Color",
                        defaultValue: "#000000",
                    },

                    labelStyle: {
                        type: ControlType.Object,
                        title: "Label",
                        controls: {
                            font: {
                                type: ControlType.Font,
                                controls: "extended",
                            },

                            color: {
                                type: ControlType.Color,
                                title: "Color",
                                defaultValue: "#828282",
                            },

                            padding: {
                                type: ControlType.FusedNumber,
                                title: "Padding",
                                defaultValue: 0,
                                toggleKey: "isMixed",
                                toggleTitles: ["All", "Individual"],
                                valueKeys: [
                                    "paddingTop",
                                    "paddingRight",
                                    "paddingBottom",
                                    "paddingLeft",
                                ],
                                valueLabels: ["T", "R", "B", "L"],
                                min: 0,
                            },
                        },
                    },
                },
            },
        },
    },

    buttonStyle: {
        type: ControlType.Object,
        title: "Button",
        controls: {
            buttonSubmit: {
                type: ControlType.String,
                title: "Submit text",
                defaultValue: "Submit",
            },
            buttonNext: {
                type: ControlType.String,
                title: "Next step text",
                defaultValue: "Continue",
            },
            buttonAlignment: {
                type: ControlType.Enum,
                options: ["Left", "Center", "Right"],
                defaultValue: "center",
                title: "Button Alignment",
            },
            styling: {
                type: ControlType.Object,
                title: "Styling",
                controls: {
                    borderRadius: {
                        type: ControlType.Number,
                        title: "Border Radius",
                        defaultValue: 10,
                    },
                    backgroundColor: {
                        type: ControlType.Color,
                        title: "Background Color",
                        defaultValue: "#2266FF",
                    },
                    borderColor: {
                        type: ControlType.Color,
                        title: "Border Color",
                        defaultValue: "#2266FF",
                    },
                    borderWidth: {
                        type: ControlType.Number,
                        title: "Border Width",
                        defaultValue: 1,
                    },
                    padding: {
                        type: ControlType.Number,
                        title: "Padding",
                        defaultValue: 16,
                    },

                    marginTop: {
                        type: ControlType.Number,
                        title: "Margin Top",
                        defaultValue: 8,
                    },

                    hoverColor: {
                        type: ControlType.Color,
                        title: "Hover",
                        defaultValue: "#2266FF",
                    },

                    showIcon: {
                        type: ControlType.Boolean,
                        title: "Show Icon",
                        defaultValue: true,
                    },
                },
            },
            fontStyle: {
                type: ControlType.Object,
                title: "Font",
                controls: {
                    font: {
                        type: ControlType.Font,
                        controls: "extended",
                    },
                    color: {
                        type: ControlType.Color,
                        title: "Color",
                        defaultValue: "#ffffff",
                    },
                },
            },
        },
    },

    success: {
        type: ControlType.Object,
        title: "Success",
        controls: {
            afterSubmit: {
                title: "On Success",
                type: ControlType.Enum,
                options: ["redirect", "toast"],
                optionTitles: [
                    "Redirect to another page",
                    "Show a toast message",
                ],
                defaultValue: "toast",
            },

            redirectURL: {
                title: "Redirect URL",
                type: ControlType.Link,

                hidden: (props) => props.afterSubmit !== "redirect",
            },
            messageTitle: {
                type: ControlType.String,
                title: "Title",
                defaultValue: "Thank you", // set default text
                hidden: (props) => props.success.afterSubmit !== "toast",
            },
            messageText: {
                type: ControlType.String,
                title: "Body",
                defaultValue: "We will be in touch shortly", // set default text
                hidden: (props) => props.success.afterSubmit !== "toast",
            },

            toastIcon: {
                type: ControlType.Number,
                title: "Size icon",
                defaultValue: 32,
            },

            iconColor: {
                type: ControlType.Color,
                title: "Color icon",
                defaultValue: "#2266ff", // set default color
                hidden: (props) => props.success.afterSubmit !== "toast",
            },
            toastFontTitle: {
                type: ControlType.Object,
                title: "Title font",
                controls: {
                    font: {
                        type: ControlType.Font,
                        controls: "extended",
                    },
                    color: {
                        type: ControlType.Color,
                        title: "Color",
                        defaultValue: "#000000",
                    },
                },
            },
            toastFontText: {
                type: ControlType.Object,
                title: "Text font",
                controls: {
                    font: {
                        type: ControlType.Font,
                        controls: "extended",
                    },
                    color: {
                        type: ControlType.Color,
                        title: "Color",
                        defaultValue: "#000000",
                    },
                },
            },
        },
    },
})
