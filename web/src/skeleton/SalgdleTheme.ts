
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const salgdleTheme: CustomThemeConfig = {
    name: 'salgdle',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "16px",
		"--theme-rounded-container": "16px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "255 255 255",
		"--on-success": "255 255 255",
		"--on-warning": "255 255 255",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #3d63fd 
		"--color-primary-50": "226 232 255", // #e2e8ff
		"--color-primary-100": "216 224 255", // #d8e0ff
		"--color-primary-200": "207 216 255", // #cfd8ff
		"--color-primary-300": "177 193 254", // #b1c1fe
		"--color-primary-400": "119 146 254", // #7792fe
		"--color-primary-500": "61 99 253", // #3d63fd
		"--color-primary-600": "55 89 228", // #3759e4
		"--color-primary-700": "46 74 190", // #2e4abe
		"--color-primary-800": "37 59 152", // #253b98
		"--color-primary-900": "30 49 124", // #1e317c
		// secondary | #4d7385 
		"--color-secondary-50": "228 234 237", // #e4eaed
		"--color-secondary-100": "219 227 231", // #dbe3e7
		"--color-secondary-200": "211 220 225", // #d3dce1
		"--color-secondary-300": "184 199 206", // #b8c7ce
		"--color-secondary-400": "130 157 170", // #829daa
		"--color-secondary-500": "77 115 133", // #4d7385
		"--color-secondary-600": "69 104 120", // #456878
		"--color-secondary-700": "58 86 100", // #3a5664
		"--color-secondary-800": "46 69 80", // #2e4550
		"--color-secondary-900": "38 56 65", // #263841
		// tertiary | #183a12 
		"--color-tertiary-50": "220 225 219", // #dce1db
		"--color-tertiary-100": "209 216 208", // #d1d8d0
		"--color-tertiary-200": "197 206 196", // #c5cec4
		"--color-tertiary-300": "163 176 160", // #a3b0a0
		"--color-tertiary-400": "93 117 89", // #5d7559
		"--color-tertiary-500": "24 58 18", // #183a12
		"--color-tertiary-600": "22 52 16", // #163410
		"--color-tertiary-700": "18 44 14", // #122c0e
		"--color-tertiary-800": "14 35 11", // #0e230b
		"--color-tertiary-900": "12 28 9", // #0c1c09
		// success | #17872a 
		"--color-success-50": "220 237 223", // #dceddf
		"--color-success-100": "209 231 212", // #d1e7d4
		"--color-success-200": "197 225 202", // #c5e1ca
		"--color-success-300": "162 207 170", // #a2cfaa
		"--color-success-400": "93 171 106", // #5dab6a
		"--color-success-500": "23 135 42", // #17872a
		"--color-success-600": "21 122 38", // #157a26
		"--color-success-700": "17 101 32", // #116520
		"--color-success-800": "14 81 25", // #0e5119
		"--color-success-900": "11 66 21", // #0b4215
		// warning | #b15959 
		"--color-warning-50": "243 230 230", // #f3e6e6
		"--color-warning-100": "239 222 222", // #efdede
		"--color-warning-200": "236 214 214", // #ecd6d6
		"--color-warning-300": "224 189 189", // #e0bdbd
		"--color-warning-400": "200 139 139", // #c88b8b
		"--color-warning-500": "177 89 89", // #b15959
		"--color-warning-600": "159 80 80", // #9f5050
		"--color-warning-700": "133 67 67", // #854343
		"--color-warning-800": "106 53 53", // #6a3535
		"--color-warning-900": "87 44 44", // #572c2c
		// error | #e02d00 
		"--color-error-50": "250 224 217", // #fae0d9
		"--color-error-100": "249 213 204", // #f9d5cc
		"--color-error-200": "247 203 191", // #f7cbbf
		"--color-error-300": "243 171 153", // #f3ab99
		"--color-error-400": "233 108 77", // #e96c4d
		"--color-error-500": "224 45 0", // #e02d00
		"--color-error-600": "202 41 0", // #ca2900
		"--color-error-700": "168 34 0", // #a82200
		"--color-error-800": "134 27 0", // #861b00
		"--color-error-900": "110 22 0", // #6e1600


		"--color-surface-50": "235 243 243", // #ebf3f3
		"--color-surface-100": "228 238 239", // #e4eeef
		"--color-surface-200": "221 234 236", // #ddeaec
		"--color-surface-300": "201 222 224", // #c9dee0
		"--color-surface-400": "160 197 200", // #a0c5c8
		"--color-surface-500": "119 172 177", // #77acb1
		"--color-surface-600": "107 155 159", // #6b9b9f
		"--color-surface-700": "89 129 133", // #598185
		"--color-surface-800": "71 103 106", // #47676a
		"--color-surface-900": "58 84 87", // #3a5457
		
		
	},
	properties_dark: {
		// surface | #141a27 
		"--color-surface-50": "220 221 223", // #dcdddf
		"--color-surface-100": "208 209 212", // #d0d1d4
		"--color-surface-200": "196 198 201", // #c4c6c9
		"--color-surface-300": "161 163 169", // #a1a3a9
		"--color-surface-400": "91 95 104", // #5b5f68
		"--color-surface-500": "20 26 39", // #141a27
		"--color-surface-600": "18 23 35", // #121723
		"--color-surface-700": "15 20 29", // #0f141d
		"--color-surface-800": "12 16 23", // #0c1017
		"--color-surface-900": "10 13 19", // #0a0d13
	}
}