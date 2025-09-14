import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import cn from 'classnames';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

interface props {
	setState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm = (props: props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [font, setFont] = useState(defaultArticleState.fontFamilyOption);
	const [size, setSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backColor, setBackColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentSize, setContentSize] = useState(
		defaultArticleState.contentWidth
	);
	function sideToggle() {
		setIsMenuOpen(isMenuOpen ? false : true);
	}
	function submitClick(event: FormEvent) {
		event.preventDefault();
		props.setState({
			fontFamilyOption: font,
			fontColor: fontColor,
			backgroundColor: backColor,
			contentWidth: contentSize,
			fontSizeOption: size,
		});
		sideToggle();
	}
	function reset() {
		props.setState(defaultArticleState);
		sideToggle();
	}
	const asideRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: asideRef,
		onChange: setIsMenuOpen,
	});
	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={sideToggle} />
			<aside
				className={cn(
					styles.container,
					isMenuOpen ? styles.container_open : ''
				)}
				ref={asideRef}>
				<form className={styles.form} onSubmit={submitClick}>
					<Text size={31} uppercase family='open-sans' weight={800}>
						Задайте параметры
					</Text>
					<Select
						selected={font}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={setFont}
					/>
					<RadioGroup
						name=''
						options={fontSizeOptions}
						selected={size}
						title='Размер шрифта'
						onChange={setSize}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						selected={backColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={setBackColor}
					/>
					<Select
						selected={contentSize}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={setContentSize}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={reset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
