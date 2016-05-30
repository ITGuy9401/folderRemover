package eu.arcangelovicedomini.folderremover.gui;

import java.awt.BorderLayout;

import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JTextField;

public class MainContainer extends JComponent {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	JTextField folderLine = null;
	JButton selectFolderButton = null;
	
	public MainContainer() {
		super();
		this.setLayout(new BorderLayout(5, 5));
		this.add(getFolderSelectForm(), BorderLayout.NORTH);
	}
	
	@SuppressWarnings("serial")
	private JComponent getFolderSelectForm() {
		JComponent folderSelect = new JComponent() {};
		folderSelect.setLayout(new BorderLayout());
		
		JLabel folderLabel = new JLabel("Selected root folder:");
		folderSelect.add(folderLabel, BorderLayout.WEST);
		
		folderLine = new JTextField(System.getenv("user.home"));
		folderSelect.add(folderLine, BorderLayout.CENTER);
		
		selectFolderButton = new JButton("Open folder", null);
		
		return folderSelect;
	}
}
